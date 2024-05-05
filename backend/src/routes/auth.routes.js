const express = require("express");
const router = express.Router();
const authServcie = require("../services/auth.service");

router.post("/login", authServcie.login);
router.post("/register", authServcie.register);

module.exports = router;
