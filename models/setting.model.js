const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String, 
    }
});

module.exports = mongoose.model("Setting", settingSchema);