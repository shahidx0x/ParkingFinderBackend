const bcrypt = require("bcrypt");
const SECRET_KEY =
  "H#bT|us<P+jbw.zY|O?n?mL<Y,9<>5H#bT|us<P+jbw.zY|O?n?mL<Y,9<>5";
const jwt = require("jsonwebtoken");
const userModel = require("../common/model");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    return res.status(400).json({ msg: "user already exist" });
  } else {
    const passHashed = await bcrypt.hash(password, 7);
    const payload = await userModel.create({
      username,
      email,
      password: passHashed,
    });

    const token = jwt.sign(
      { email: payload.email, id: payload._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ payload, token: token });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "user not registered" });
    const matchPassHashed = await bcrypt.compare(password, user.password);
    if (!matchPassHashed)
      return res.status(400).json({ msg: "wrong password" });
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ user, token: token });
  } catch (errors) {
    res.status(500).json({ msg: { errors } });
  }
};
