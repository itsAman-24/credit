const userModel = require("../model/user.model.js");
const { validationResult } = require("express-validator");

module.exports.registerController = async (req, res) => {
  console.log(req.body);

  try {
    // console.log("Received Data:", req.body); // Debugging

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    res.cookie("token", token);
    res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // console.log(password);

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res
      .status(200)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
