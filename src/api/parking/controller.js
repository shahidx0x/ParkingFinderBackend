const parkingModel = require("./model");

exports.parking_data = async (req, res) => {
  const parkingData = await parkingModel.find({});
  if (parkingData) {
    res.status(200).json(parkingData);
  }
};

exports.add_parking = async (req, res) => {
  const payload = await parkingModel.create(req.body);
  if (payload) {
    res.status(201).json({ msg: "parking addded", payload });
  } else {
    res.status(400).json({ msg: "server error" });
  }
};

exports.get_specific = async (req, res) => {
  let email = req.params.email;

  data = await parkingModel.findOne({ email: email });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ msg: "server error" });
  }
};

exports.update_specific = async (req, res) => {
  const payload = parkingModel.findOneAndUpdate(
    { email: req.params.email },
    { parkingData: req.body },
    { new: true }
  );
  if (payload) {
    res.status(200).json({ payload });
  } else {
    res.status(500).json({ msg: "server error" });
  }
};

exports.delete_specific = async (req, res) => {
  const deleted = await parkingModel.findOneAndDelete({
    email: req.params.email,
  });
  if (!deleted) {
    res.status(404).json({ error: "parking not found" });
  } else {
    res.status(200).json({ msg: "parking deleted" });
  }
};
