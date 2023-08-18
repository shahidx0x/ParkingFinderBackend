const userModel = require("../users/common/model");


exports.update_location = async(req,res) =>{
    try {
        const emailToUpdate = req.params.email;
        const newLocationData = req.body.location; // location data is an object { lat, lng }
    
        const updatedUser = await userModel.findOneAndUpdate(
          { email: emailToUpdate },
          { $set: { location: newLocationData } },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: 'Error updating user location', error });
      }

}



