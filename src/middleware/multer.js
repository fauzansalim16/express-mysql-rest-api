const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/images');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const originalname = file.originalname;

    cb(null, `${timestamp}/${originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, //3 Mb
  },
});

module.exports = upload;
