const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");
const authenticate = require("../middlewares/auth.middleware");

router.get("/shop", shopController.getAllShops);
router.post("/shop",authenticate, shopController.createShop);
router.get("/shop/:id", shopController.getShopById);
router.put("/shop/:id", shopController.updateShop);
router.delete("/shop/:id", shopController.deleteShop);

module.exports = router;