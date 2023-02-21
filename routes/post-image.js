const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            const error = new Error('Only JPEG and PNG files are allowed');
            error.code = 'FILE_TYPE';
            return cb(error, false);
        }
        cb(null, true);
    },
});


router.post('/post-image', upload.array('pic'), (req, res) => {
    res.redirect("/");
});

module.exports = router;