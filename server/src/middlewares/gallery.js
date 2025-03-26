const multer = require("multer");
const path = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.startsWith('image') ? 'images' : 'videos';
   cb(null, path.join(__dirname, `../uploads/${fileType}`)); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPG, PNG) and videos (MP4) are allowed!"), false);
  }
};

// Limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 10MB max
  },
}).fields([
  { name: "images", maxCount: 4 },
  { name: "video", maxCount: 1 },
]);

module.exports = upload;
