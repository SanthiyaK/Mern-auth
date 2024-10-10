const Property = require('../models/Property'); // Import Property model




// GET all properties
exports.getAllProperty=async(req,res)=>{
  try {
    console.log(req.user)
    const properties = await Property.find(req.user._id);
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
}

exports.getSingleProperty=async (req, res) => {
  try {
    const property = await Property.findById(req.params.id,req.user._id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property' });
  }
}


exports.postProperty=async (req, res) => {
  const { title, price, location, bedrooms, bathrooms, size, status } = req.body;

  try {
    const newProperty = new Property({
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      size,
      status,
      user:req.user._id
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create property' });
  }
}

/* // PUT update a property (protected - admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update property' });
  }
});

// DELETE a property (protected - admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property' });
  }
});

 */ 