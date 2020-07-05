const multer = require('multer');
const jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
}

exports.upload = multer(multerOptions).array('photos', 3);

exports.resize = async (req, res, next) => {

    if (!req.files || !req.files.length) {
        next();
        return;
    }

    req.body.photos = [];
    const files = req.files;

    for (const file of files) {
        const extension = file.mimetype.split('/')[1];
        const filename = `${uuidv1()}.${extension}`;

        try {
            const photo = await jimp.read(file.buffer);
            photo.resize(800, jimp.AUTO);
            photo.write(`./public/uploads/${filename}`);
            req.body.photos.push(filename);
        } catch (e) { }
    }
    next();
};