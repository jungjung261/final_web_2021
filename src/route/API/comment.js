const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middlewares/checkUser");
const PostController = require("../../app/controllers/PostController");
const multer = require("multer");

router.use(checkUser);
router.get("/", );

module.exports = router;