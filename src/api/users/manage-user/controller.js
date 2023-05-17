const userModel = require("../common/model");

exports.update_profile = async (req, res) => {
  let data;
  let mod_data = req.body;
  let res1 = Object.assign(mod_data, req.body.profile_image);
  console.log(res1);
  let email = req.params.email;
  try {
    data = await userModel.findOne({ email: email });
    if (data) {
      Object.assign(data, req.body);
      console.log(data);
      data.save();
      res.status(200).json({ msg: "updated", data });
    }
  } catch (error) {
    return next(error);
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

exports.search_by_cont_no = async (req, res, next) => {
    let cont_no = req.params.cont_no;
    try {
      data = await userModel.findOne({
        userinfo: {
          $elemMatch: {
            cont_no: cont_no,
          },
        },
      });
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ data });
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

exports.delete_all_user = async (req, res) => {
  const deleted_list = await userModel.deleteMany({});
  if (deleted_list) {
    res.status(200).json({ msg: "all user deleted" });
  }
  res.status(500).json({ msg: "something went wrong" });
};
