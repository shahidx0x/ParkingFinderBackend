const userModel = require("../common/model");

exports.update_profile = async (req, res) => {
  try {
    const emailToUpdate = req.params.email;
    const newData = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: emailToUpdate },
      { $set: newData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User Data Updated", updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user data", error });
  }
};

exports.search_by_email = async (req, res) => {
  let email = req.params.email;
  try {
    data = await userModel.findOne({ email: email });
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

exports.get_all_user = async (req, res) => {
  const users_all = await userModel.find({});
  if (users_all) {
    res.status(200).json(users_all);
  }
};

exports.users = async (req, res) => {
  const users = await userModel.find({ role: "user" });
  !users && res.status(400).json({ msg: "No user found !" });
  if (users) {
    res.status(200).json(users);
  }
};

exports.owners = async (req, res) => {
  const owners = await userModel.find({ role: "owner" });
  !owners && res.status(400).json({ msg: "No owner found !" });
  if (owners) {
    res.status(200).json(owners);
  }
};

exports.delete_all_user = async (req, res) => {
  const deleted_list = await userModel.deleteMany({});
  if (deleted_list) {
    res.status(200).json({ msg: "all user deleted" });
  }
  res.status(500).json({ msg: "something went wrong" });
};
