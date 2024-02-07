const multer = require('multer');

const MIMES_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Specify the destination folder for uploaded files
    console.log('file multer:', file);
    callback(null, 'images/');
  },
  filename: function (req, file, callback) {
    const name = file.originalname.split(' ').join('-');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = MIMES_TYPES[file.mimetype];
    if (!extension) {
      return callback(new Error('Invalid file type'));
    }
    callback(null, name + '-' + uniqueSuffix + '.' + extension);
  },
});

const multerUpload = multer({ storage }).single('imageUrl');

module.exports = multerUpload;
