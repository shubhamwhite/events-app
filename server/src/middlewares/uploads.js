const multer = require('multer');
const path = require('path');

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = file.mimetype.startsWith('image') ? 'images' : 'videos';
    cb(null, path.join(__dirname, `../uploads/${fileType}`));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|mp4/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images and videos only!');
};
 
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload; 
