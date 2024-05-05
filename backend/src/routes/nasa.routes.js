const express = require("express");
const router = express.Router();
const nasaService = require("../services/nasa.service");

router.post("/images", nasaService.images);
router.get("/apod", nasaService.astronomyPictureOfTheDay);
router.get("/earth", nasaService.earthImagery);

module.exports = router;
