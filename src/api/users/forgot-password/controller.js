const nodemailer = require("nodemailer"   );
const userModel  = require("../common/model");
const bcrypt     = require("bcrypt"       );
const ejs        = require("ejs"          );
const path       = require("path"         );


exports.forgot_password = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No user found with that email address" });
    }

    const resetToken = Math.floor(Math.random() * 900000) + 100000;
    const resetExpires = Date.now() + 3600000;
    const hours = Math.floor((resetExpires - Date.now()) / 3600000);
    const minutes = Math.floor(((resetExpires - Date.now()) % 3600000) / 60000);
    const expiresIn = `${hours} hour(s) and ${minutes} minute(s)`;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const data = { code: resetToken, time: expiresIn };
    ejs.renderFile(
      path.join(__dirname, "view", "reset_password.ejs"),
      data,
      (err, html) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Internal Server Error" });
        } else {
          const mailOptions = {
            to: user.email,
            from: process.env.GMAIL_USER,
            subject: `Email Verification Code : ${resetToken}`,
            html: html,
          };

          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Error sending password reset email" });
            }

            return res
              .status(200)
              .json({ message: "Password reset email sent" });
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.verifyToken = async (req, res) => {
  const { resetToken } = req.body;
  try {
    const user = await userModel.findOne({ resetPasswordToken: resetToken });
    if (!user) {
      return res.status(400).json({ msg: "Invalid reset token" });
    }

    const now = new Date();
    if (now > user.resetPasswordExpires) {
      return res.status(400).json({ msg: "Reset token has expired ! Try again" });
    }

    return res.status(200).json({ msg: "Verification Successfull" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  console.log(resetToken, newPassword);
  const user = await userModel.findOne({ resetPasswordToken: resetToken });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};
