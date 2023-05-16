const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const userModel = require("../common/model");

exports.signup = async (req, res) => {
  const {
    email,
    password,
    profile_image,
    username,
    address,
    nick_name,
    cont_no,
    nid_image,
    licence_image,
    role,
    isEmailVarified,
    isPhoneVarified,
    dob,
    gender,
  } = req.body;
  try {
    const userinfo = [
      {
        profile_image,
        username,
        address,
        nick_name,
        cont_no,
        nid_image,
        licence_image,
        role,
        isEmailVarified,
        isPhoneVarified,
        dob,
        gender,
      },
    ];

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
    res.status(500).json({ msg: { errors } });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  try {
    const isExist = await userModel.findOne({ email: email });
    console.log(isExist);
    if (!isExist) return res.status(404).json({ msg: "user not registered" });

    const matchPassHashed = await bcrypt.compare(password, isExist.password);
    if (!matchPassHashed)
      return res.status(400).json({ msg: "wrong password" });

    const token = jwt.sign(
      { email: isExist.email, id: isExist._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ isExist, token: token });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({ msg: { errors } });
  }
};
