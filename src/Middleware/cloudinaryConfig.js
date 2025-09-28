// middleware/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dhc9hwnvi",
  api_key: "312537662212334",
  api_secret: '7laBapH9SF2diRhIYP17RGUydpY',
});

// Year-wise folder structure in Cloudinary
const getYearWiseFolder = () => {
  const currentYear = new Date().getFullYear();
  return `uploads/${currentYear}`;
};

// Storage config with dynamic year-wise folders
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => getYearWiseFolder(),
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\s+/g, '_').split('.')[0];
      return `${timestamp}-${originalName}`;
    },
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: "auto" },
      { format: "auto" }
    ]
  },
});

// Enhanced storage with month-wise subfolders
const storageWithMonths = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      return `uploads/${year}/${month}`;
    },
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\s+/g, '_').split('.')[0];
      return `${timestamp}-${originalName}`;
    },
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: "auto" },
      { format: "auto" }
    ]
  },
});

// User-wise folders within year folders
const storageWithUserFolders = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      const currentYear = new Date().getFullYear();
      const userId = req.body.UserId || req.user?.id || 'unknown';
      return `uploads/${currentYear}/${userId}`;
    },
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\s+/g, '_').split('.')[0];
      return `${timestamp}-${originalName}`;
    },
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: "auto" },
      { format: "auto" }
    ]
  },
});

module.exports = { 
  storage, 
  storageWithMonths, 
  storageWithUserFolders, 
  cloudinary,
  getYearWiseFolder 
};