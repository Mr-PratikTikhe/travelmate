const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary'); // ✅ Make sure this is correct

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary, // ✅ MUST be passed
  params: {
    folder: 'travelmate_uploads', // ✅ This creates the folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage });

router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file received' });
    console.log('Uploaded file:', req.file);
    res.json({ url: req.file.path });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
