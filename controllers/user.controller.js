const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({
            success: true,
            message: "Users get successfully",
            users,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Users Not Found",
            error,
        });
    }
};

exports.userRegister = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User is already here",
          success: true,
        });
      }
      const newUser = new userModel(req.body);
      await newUser.save();
  
      const token = JWT.sign(
        {
          user: { id: newUser._id, username: newUser.name },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.status(200).send({
        success: true,
        message: "User Register  Successfully",
        newUser,
        token,
      });
    } catch (error) {
      console.log(error),
        res.status(500).json({
          message: "Internal Server Errro",
          error,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User Not Found",
            error,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User Not Found",
            error,
        });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User is not found",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = JWT.sign(
      {
        user: { id: user._id, useremail: user.email },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "User Login Successfull",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.userResetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required.",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        user.password = newPassword
        const token = JWT.sign(
            {
              user: { id: user._id, useremail: user.email },
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
        res.status(200).json({
            success: true,
            message: "Password reset successfully.",
            token,
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while resetting the password.",
            error: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "User Found Successfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User Not Found",
            error,
        });
    }
};  