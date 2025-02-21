import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name && !email && !password && !role) {
      res.send("All field is required");
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.send("Email is already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = new User({ name, email, password: hashPassword, role });

    if (!user) {
      res.send("User is not register, try again");
    }
    await user.save();

    const userToken = jwt.sign(
      {
        data: user._id,
      },
      "secret",
      { expiresIn: 60 * 60 }
    );

    res.status(200).json({
      success: true,
      message: "User register successfully",
      user,
      userToken,
    });
  } catch (error) {
    console.log("error in user register", error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      return next(new AppError("All data require", 404));
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email is not match",
      });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new AppError("Password does not match", 404));
    }

    // user.password = undefined;

    // res.cookie("token", token, cookieOptions);
    const userToken = jwt.sign(
      {
        data: user._id,
      },
      "secret",
      { expiresIn: 60 * 60 }
    );

    res.status(200).json({
      success: true,
      message: "User logged successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      userToken,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "User is not login",
      error: e,
    });
  }
};
