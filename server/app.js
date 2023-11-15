// JavaScript (Node.js)
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer middleware
const { main } = require('./tripdataload.js');  // Import the data loading script

const app = express();
app.use(cors());

// Set up multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded');
  } else if (!file.originalname.endsWith('.csv')) {
    fs.unlinkSync(file.path);
    return res.status(400).send('Only CSV files are allowed');
  } 
  const filePath = `uploads/${file.originalname}`;
  fs.renameSync(file.path, filePath); // Rename the uploaded file
  main(filePath, 'OneDayTrip')
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.error('Error:', error);
      res.sendStatus(500);
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;