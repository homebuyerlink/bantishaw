const multer = require('multer');
const config = require('./../config');
const fs = require('fs');
const errorHandler = require('./../utils/errorHandler');
class UtilsController {
    constructor() {

    }
    uploadFile(req, res, next) {
        try {
            if (!fs.existsSync('public/uploads')) {
                fs.mkdirSync('public/uploads');
            }
            let storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'public/uploads')
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + '-' + file.originalname)
                }
            });
            let upload = multer({ storage: storage });
            return upload.single('file')(req, res, next);
        } catch (error) {
            errorHandler.sendRawError(res, error);
        }
    }
    async sendResponse(req, res, next) {
        try {
            res.send({ url: `${req.protocol + '://' + req.get('host')}/public/uploads/${req.file.filename}` })
        } catch (error) {
            console.log(error);
        }
    }
}

const utilsController = new UtilsController();
module.exports = { utilsController };