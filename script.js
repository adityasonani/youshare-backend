const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();

async function deleteData() {
    const pastDate = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const files = await File.find({ createdAt: { $lt:  pastDate} });
    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path); // storage
                await file.remove();
                console.log(`File deleted successfully from date ${pastDate} and filename ${file.filename}`);
            } catch (err) {
                console.log("Error occured! ", err);
            }
        }
    }
}

deleteData().then(() => {
    console.log("Process done!");
    process.exit();
});
