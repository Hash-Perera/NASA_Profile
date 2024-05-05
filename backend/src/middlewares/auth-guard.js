const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const AuthGuard = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  //! Allow login endpoint without token
  if (req.path === "/api/v1/auth/login") {
    return next();
  }
  //! Allow register endpoint without token
  if (req.path === "/api/v1/auth/register") {
    return next();
  }

  //! Checking token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token! didn't match" });
    }

    const findUser = await User.findById(user.id).select("-password");

    if (!findUser) {
      return res
        .status(403)
        .json({ message: "Invalid token! cannot find user" });
    }
    req.user = findUser._id;
    next();
  });
};

module.exports = { AuthGuard };
