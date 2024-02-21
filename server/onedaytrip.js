// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Data = require('./DataModel');
require('dotenv').config();



// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);

// // Define a Mongoose schema
// const Schema = mongoose.Schema;
// const DataSchema = new Schema({
//     SeqNo: Number,
//     Place: String,
//     Distance: Number,
//     lat: Number,
//     lng: Number,
//     Start: String,
//     Stop: String,
//     TravelCost: Number,
//     Date: String
// });

// // Create a Mongoose model
// const Data = mongoose.model('Data', DataSchema);

// Create a POST route
// Import the Data model
app.post('/insert', async (req, res) => {
    const { SeqNo, Place, Distance, lat, lng, Start, Stop, TravelCost, Date } = req.body;

    try {
        const data = new Data({ SeqNo, Place, Distance, lat, lng, Start, Stop, TravelCost, Date });
        await data.save();

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error });
    }
});

//Create a GET route
app.get('/fetch', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});
//create a edit route http://localhost:3000/edit/${editItem.id}
app.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { SeqNo, Place, Distance, lat, lng, Start, Stop, TravelCost, Date  } = req.body;

    try {
        await Data.findByIdAndUpdate(id, { SeqNo, Place, Distance, lat, lng, Start, Stop, TravelCost, Date  });
        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
}
);
//create a delete route http://localhost:3000/delete/${id}
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Data.findByIdAndDelete(id);
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
}
);

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));