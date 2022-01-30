const router = require('express').Router();

router.get('/:pd', async (req, res)=>{
    if (req.params.pd == process.env.REQUIRED_PD) {
        require('../script')().then(() => {
            console.log("Process done!");
            process.exit();
        });
        res.send('All records older than 24 hrs deleted.');
    } else {
        res.send('Error in deletion. Please check logs on heroku');
    }
});

module.exports = router;