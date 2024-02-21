// Import necessary modules
const mongoose = require('mongoose');

// Define a Mongoose schema
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    SeqNo: Number,
    Place: String,
    Distance: Number,
    lat: Number,
    lng: Number,
    Start: String,
    Stop: String,
    TravelCost: Number,
    Date: String
});

// Create a Mongoose model
const Data = mongoose.model('Data', DataSchema);

// Export the Data model
module.exports = Data;