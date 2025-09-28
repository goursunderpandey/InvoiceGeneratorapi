const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to create year-wise folder structure
const getYearWisePath = () => {
  const currentYear = new Date().getFullYear();
  const yearPath = path.join("uploads", currentYear.toString());
  
  // Create the year folder if it doesn't exist
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath, { recursive: true });
  }
  
  return yearPath;
};

// Storage config with dynamic year-wise folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const yearPath = getYearWisePath();
    cb(null, yearPath);
  },
  filename: (req, file, cb) => {
    // Get file extension
    const ext = path.extname(file.originalname).toLowerCase();
    // Create filename with timestamp and original name (without spaces)
    const filename = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, filename);
  },
});

// Enhanced storage with month-wise subfolders (optional)
const storageWithMonths = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month from 01-12
    
    const monthPath = path.join("uploads", year.toString(), month);
    
    // Create the year/month folder if it doesn't exist
    if (!fs.existsSync(monthPath)) {
      fs.mkdirSync(monthPath, { recursive: true });
    }
    
    cb(null, monthPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, filename);
  },
});

// Alternative: User-wise folders within year folders
const storageWithUserFolders = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentYear = new Date().getFullYear();
    const userId = req.body.UserId || req.user?.id || 'unknown'; // Get user ID from request
    
    const userPath = path.join("uploads", currentYear.toString(), userId);
    
    // Create the year/user folder if it doesn't exist
    if (!fs.existsSync(userPath)) {
      fs.mkdirSync(userPath, { recursive: true });
    }
    
    cb(null, userPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, filename);
  },
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (JPG, JPEG, PNG, WEBP, GIF)"));
  }
};

// Choose which storage configuration to use:
// Option 1: Year-wise only
const upload = multer({
  storage,
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
  uploadWithUserFolders,     // Year and user-wise
  getYearWisePath           // Export the function if needed elsewhere
};