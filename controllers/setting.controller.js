const settingModel = require("../models/setting.model");

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await settingModel.find({});
    res.status(200).json({
      success: true,
      message: "Settings get successfully",
      settings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Settings Not Found",
      error,
    });
  }
};

exports.getSettingById = async (req, res) => {
  try {
    const setting = await settingModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Setting Found Successfully",
      setting,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Setting Not Found",
      error,
    });
  }
};

exports.createSetting = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    const newSetting = await settingModel.create({
      name,
      image,
    });
    await newSetting.save();

    res.status(201).json({
      success: true,
      message: "Setting created successfully",
      setting: newSetting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create setting",
      error: error.message,
    });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedSetting = await settingModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Setting updated successfully",
      setting: updatedSetting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update setting",
      error: error.message,
    });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    const setting = await settingModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Setting deleted successfully",
      setting,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Setting Not Found",
      error,
    });
  }
};
