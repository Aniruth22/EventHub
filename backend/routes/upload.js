const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const auth = require('../middleware/authMiddleware'); // ✅ IMPORT THE AUTH MIDDLEWARE

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single('eventPoster');

// ✅ PROTECT THE ROUTE WITH THE AUTH MIDDLEWARE
router.post('/', auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (req.file == undefined) {
      return res.status(400).json({ error: 'No file selected!' });
    }
    const newFile = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });
    try {
      const savedFile = await newFile.save();
      res.status(201).json({
        message: 'File uploaded successfully!',
        file: savedFile
      });
    } catch (dbErr) {
      res.status(500).json({ error: 'Error saving file metadata to database.' });
    }
  });
});

module.exports = router;