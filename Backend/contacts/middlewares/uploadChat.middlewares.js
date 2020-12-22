const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();
aws.config.update({
    secretAccessKey: process.env.SecretKey,
    accessKeyId: process.env.AccessKey,
    region: process.env.region
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
            false);
    }
};
const upload = multer({
    // fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.BucketChat,
        key: function (req, file, cb) {
            console.log(req.file);
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
        }
    })
});

module.exports = upload;