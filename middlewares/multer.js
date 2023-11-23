const multer = require("multer");
const { Readable } = require('node:stream');
const cloudinary = require('cloudinary').v2;
const { CLOUDNAME, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY, BASEFORDELCLOUDINARY } = process.env;

const storage = multer.memoryStorage();
const baseFordel = BASEFORDELCLOUDINARY;

cloudinary.config({
    cloud_name: CLOUDNAME,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY,
    stream: true
});

async function uploadStream(buffer, folder) {
    return new Promise((res, rej) => {
        const theTransformStream = cloudinary.uploader.upload_stream(
            { folder: baseFordel + "/" + folder },
            (err, result) => {
                if (err) return rej(err);
                res(result);
            }
        );
        let str = Readable.from(buffer);
        str.pipe(theTransformStream);
    });
}

const uploadFile = multer({ storage });

module.exports = {
    uploadFile,
    uploadStream
}
