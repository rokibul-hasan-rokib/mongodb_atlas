const shopModel = require("../models/shop.model");


exports.getAllShops = async (req, res) => {
    try {
        const shops = await shopModel.find({});
        res.status(200).json({
        success: true,
        message: "Shops get successfully",
        shops,
        });
    } catch (error) {
        res.status(404).json({
        success: false,
        message: "Shops Not Found",
        error,
        });
    }
};

exports.getShopById = async (req, res) => {
    try {
        const shop = await shopModel.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        res.status(200).json({
        success: true,
        message: "Shop Found Successfully",
        shop,
        });
    } catch (error) {
        res.status(404).json({
        success: false,
        message: "Shop Not Found",
        error,
        });
    }
};

exports.createShop = async (req, res) => {
    try {
        const userId = req.user?._id; 
        
        const shop = await shopModel.create({
            ...req.body, 
            createdById: userId, 
        });

        res.status(200).json({
            success: true,
            message: "Shop created successfully",
            shop,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Shop creation failed",
            error: error.message,
        });
    }
};



exports.updateShop = async (req, res) => {
    try {
        const shop = await shopModel.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        const updateData = {
            ...req.body,
            updatedById: req.user.id,
        };

        const updatedShop = await shopModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true, 
                runValidators: true, 
            }
        );

        res.status(200).json({
            success: true,
            message: "Shop updated successfully",
            shop: updatedShop,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the shop",
        });
    }
};


exports.deleteShop = async (req, res) => {
    try {
        const shop = await shopModel.findByIdAndDelete(req.params.id);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        res.status(200).json({
        success: true,
        message: "Shop Deleted Successfully",
        shop,
        });
    } catch (error) {
        res.status(404).json({
        success: false,
        message: "Shop Not Found",
        error,
        });
    }
};