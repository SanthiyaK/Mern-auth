const mongoose = require('mongoose');

// Define the schema for the Property model
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Sold'], default: 'Available' },
}, { timestamps: true });

// Create the Property model
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;