// middleware/uploadConfig.js
const multer = require("multer");
const path = require("path");
const { 
  storage, 
  storageWithMonths, 
  storageWithUserFolders 
} = require("./cloudinaryConfig");

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (JPG, JPEG, PNG, WEBP, GIF)"), false);
  }
};

// Choose which storage configuration to use:
// Option 1: Year-wise only
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
  fileFilter,
});

// Option 2: Year and month-wise
const uploadWithMonths = multer({
  storage: storageWithMonths,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// Option 3: Year and user-wise
const uploadWithUserFolders = multer({
  storage: storageWithUserFolders,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

module.exports = {
  upload,                    // Year-wise only
  uploadWithMonths,          // Year and month-wise
  uploadWithUserFolders
};