const express = require("express");
const router = express.Router();
const settingController = require("../controllers/setting.controller");
const upload = require("../middlewares/multer.middleware");
router.get("/setting", settingController.getAllSettings);
router.post("/setting",upload.single("image"), settingController.createSetting);
router.get("/setting/:id", settingController.getSettingById);
router.put("/setting/:id",upload.single("image"), settingController.updateSetting);
router.delete("/setting/:id", settingController.deleteSetting);

module.exports = router;