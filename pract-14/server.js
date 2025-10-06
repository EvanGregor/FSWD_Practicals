const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word files are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
});

app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

app.post('/upload', upload.single('resume'), (req, res) => {
  res.render('index', { 
    message: `File uploaded successfully: ${req.file.originalname}`, 
    error: null 
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.render('index', { message: null, error: 'File too large! Max size is 2MB.' });
  }
  if (err) {
    return res.render('index', { message: null, error: `${err.message}` });
  }
  next();
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
