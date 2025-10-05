const Item = require("../Modal/Item.modal");

// Create new item
exports.createItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body, profileImage: req.file ? `${req.file.filename}` : null });
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single item
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body, profileImage: req.file ? `${req.file.filename}` : null }, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.searchItem = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name query parameter is required" });
    }

    // Case-insensitive partial search
    const items = await Item.find({
      name: { $regex: name, $options: "i" }
    });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}