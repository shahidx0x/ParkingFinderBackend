const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "ddkohtuwd", 
  api_key: "565951417544418",
  api_secret: process.env.CLOUD_API_SECRET
});

const upload = multer({ dest: "./uploads" });
const  cloudinaryUploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: "File upload error: " + err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        if (result) fs.unlinkSync(req.file.path);
         req.body.profile_image = result?.secure_url;
        req.body.cloudinaryPublicId = result?.public_id;
      }
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Cloudinary upload error: " + error.message });
    }
  });
};

module.exports = cloudinaryUploadMiddleware;
