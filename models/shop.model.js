const mongoose = require("mongoose");

const STATUS_LIST = {
    0: "InActive",
    1: "Active",
  };
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    website: {
        type: String,
    },
    openingTime: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        trim: true, 
    },
    closingTime: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, 
        trim: true,
    },    
    status: {
        type: Number, 
        enum: [0, 1], 
        default: 0,
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    updatedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
}, { timestamps: true });

shopSchema.virtual("shopStatus").get(function () {
    return STATUS_LIST[this.role];
  });
shopSchema.set("toJSON", { virtuals: true });
shopSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Shop", shopSchema);
