const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const userModel = require("./model");

exports.signup = async (req, res) => {
  const { userinfo, email, password } = req.body;
  try {
    const isExist = await userModel.findOne({ email: email });
    if (isExist) return res.status(400).json({ msg: "user already exist" });
    const passHashed = await bcrypt.hash(password, 7);
    const payload = await userModel.create({
      userinfo,
      email,
      password: passHashed,
    });
    const token = jwt.sign(
      { email: payload.email, id: payload._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({ payload, token: token });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({ msg: {errors} });
  }
};

