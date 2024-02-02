// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);

// Define a Mongoose schema
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    SeqNo: Number,
    Place: String,
    Distance: Number
});

// Create a Mongoose model
const Data = mongoose.model('Data', DataSchema);

// Create a POST route
app.post('/insert', async (req, res) => {
    const { SeqNo, Place, Distance } = req.body;

    try {
        const data = new Data({ SeqNo, Place, Distance });
        await data.save();

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error });
    }
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));