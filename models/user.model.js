const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ROLE_ENUM = {
  0: "user",
  1: "admin",
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number, 
    enum: [0, 1], 
    default: 0, 
  },
}, { timestamps: true });

userSchema.virtual("roleName").get(function () {
  return ROLE_ENUM[this.role];
});
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });


userSchema.pre("save", async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

module.exports = mongoose.model("User", userSchema);
