const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));

app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'));

app.use('/api/delete', require('./routes/delete'));

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});


