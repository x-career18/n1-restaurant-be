const express = require("express");
const router = express.Router();

const controller = require("../controllers/ImageController");
const asyncHandler = require("express-async-handler");
const authMdw = require("../middlewares/authMdw");
const { uploadFile } = require("../middlewares/multer");

router.use(authMdw);
router.use("/create", uploadFile.single("image"), asyncHandler(controller.create));
router.use("/update", asyncHandler(controller.update));
router.use("/getById", asyncHandler(controller.getById));
router.use("/", asyncHandler(controller.index));

module.exports = router;
