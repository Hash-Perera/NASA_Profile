const axios = require("axios");

exports.images = async (req, res) => {
  const page = req.body.page || 1;
  const filterDate = req.body.filterDate;

  try {
    if (
      filterDate == undefined ||
      filterDate == null ||
      filterDate == "" ||
      filterDate == {}
    ) {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${process.env.NASA_API_KEY}`
        )
        .then((response) => {
          res.status(200).json({ success: true, data: response.data });
        })
        .catch((error) => {
          console.log(error.message);
          throw new Error("Failed to fetch images. Please try again.");
        });
    } else {
      axios
        .get(
          ` https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${filterDate}&api_key=${process.env.NASA_API_KEY}`
        )
        .then((response) => {
          res.status(200).json({ success: true, data: response.data });
        })
        .catch((error) => {
          console.log(error.message);
          throw new Error("Failed to fetch images. Please try again.");
        });
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch images. Please try again.");
  }
};

exports.astronomyPictureOfTheDay = async (req, res) => {
  try {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
      )
      .then((response) => {
        res.status(200).json({ success: true, data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
        throw new Error("Failed to fetch images. Please try again.");
      });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to fetch images. Please try again.");
  }
};

//api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.10&api_key=Tgg2YWBOhr7s6ocjLEa4g2pe6IRFLAeXHpDBh53L

exports.earthImagery = async (req, res) => {
  try {
    axios
      .get(
        `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.10&api_key=${process.env.NASA_API_KEY}`
      )
      .then((response) => {
        res.status(200).json({ success: true, data: response.data });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
