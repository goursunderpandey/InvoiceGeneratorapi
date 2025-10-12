const Supplier = require("../Modal/Supplier.Modal")

exports.createSupplier = async (req, res) => {
  try {
    const { supplierName, email, phone, address, city, country, description } = req.body;

    const supplier = new Supplier({
      supplierName,
      email,
      phone,
      address,
      city,
      country,
      description
    });

    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (error) {
    res.status(404).json({ message: "Supplier not found" });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body ,
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
