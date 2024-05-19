const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../models/user.model");

//!---- Register User Service
exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const encryptedPassword = await argon2.hash(userData.password);
    userData.password = encryptedPassword;
    const newUser = await User.create(userData);
    res.status(200);
    res.json({ success: true, data: newUser });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to create user. Please try again.");
  }
};

//!---- Login User Service
exports.login = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "User not found. Please try again." });
    }

    if (!(await argon2.verify(user.password, userData.password))) {
      return res
        .status(403)
        .json({ message: "Password is incorrect. Please try again." });
    }

    //? generate jwt token
    const payload = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // //? get user permissions
    // const permissions = await Role.findById(user.role).populate("permissions");
    // const userPermissionsList = permissions.permissions.map((permission) => {
    //   return permission.permissionNo;
    // });

    //? send token and permissions
    res.status(200).json({ token: payload, userName: user.firstName });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

exports.addFavourite = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user },
    { $push: { faveImages: req.body.imageUrl } },
    { new: true }
  );

  return res.json({
    message: "Added to favourites",
  });
};

exports.getFavourites = async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  return res.json({
    message: "Favourites",
    data: user.faveImages,
  });
};
