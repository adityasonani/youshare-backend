const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res)=>{
    // console.log("here in /files/download/uuid");
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        return res.render('download', {error: 'Link has been expired or please check the url.'});
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);

});

module.exports = router;
