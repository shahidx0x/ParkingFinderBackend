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
  try {
    const { email } = req.params;
    const toUpdated = req.body;
    const updatedDocument = await parkingModel.findOneAndUpdate(
      { email: email },
      { $set: { parkingData: toUpdated } },
      { new: true }
    );
    if (updatedDocument) {
      res.status(200).json({ payload: updatedDocument });
    } else {
      res.status(404).json({ msg: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.delete_specific = async (req, res) => {
  try {
    const deleted = await parkingModel.findOneAndDelete({
      email: req.params.email,
    });
    if (!deleted) {
      return res.status(404).json({ error: "Parking not found", deleted });
    }
    return res.status(200).json({ msg: "Parking deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.delete_all = async (req, res) => {
  const deleted = await parkingModel.deleteMany();
  if (!deleted.deletedCount > 0) {
    res.status(404).json({ error: "parking not found" });
  } else {
    res.status(200).json({ msg: "parking deleted" });
  }
};
