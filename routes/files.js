const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuid4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        // unique file name
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 * 100 }, //100mb
}).single('myfile');


router.post('/', (req, res)=>{
    
    // store file
    upload(req, res, async (err)=>{
        // validate req
        if (!req.file) {
            return res.json({error: 'Please fill in all fields properly.'});
        }
        
        if (err) {
            return res.status(500).send({error: err.message});
        }

        // store in db
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        // "http://localhost:3000/files/d47fa0d9-7bcd-4c70-ae43-ada0da435f7c"
    });

    // send response (dw link)

});

module.exports = router