const Property = require('../models/Property'); // Import Property model




// GET all properties
exports.getAllProperty=async(req,res)=>{
  try {
    console.log()
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
}

