const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'restaurant-items',
        allowed_formats: ['jpg', 'jpeg', 'png', "svg", "avif", 'webp'],
    },
});

const upload = multer({ storage });

module.exports = upload;
