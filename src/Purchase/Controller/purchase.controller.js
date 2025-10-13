const Sale = require("../Modal/purchase.modal");

// Add Sale
exports.addpurchase = async (req, res) => {
    try {
        const { SupplierId, PurchaseDate, PurchaseType, Items } = req.body;

        if (!SupplierId || !Items || !PurchaseType || Items.length === 0) {
            return res.status(400).json({ error: "SupplierId and Items are required" });
        }

        // Calculate Grand Total
        const grandTotal = Items.reduce((acc, item) => acc + item.qty * item.costPrice, 0);

        const newSale = new Sale({
            SupplierId,
            PurchaseDate,
            PurchaseType,
            Items,
            GrandTotal: grandTotal,
        });

        await newSale.save();

        res.status(201).json({
            message: "Sale created successfully",
            data: newSale,
        });
    } catch (err) {
        console.error("Error creating sale:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get All Sales
exports.getPurchase = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("SupplierId", "_id supplierName email phoneNumber address ")
            .populate("Items.id", "name");

            console.log();
        const formattedSales = sales.map((sale) => {
            const total = sale.Items.reduce((acc, item) => {
                return acc + (item.qty * item.costPrice);
            }, 0);



            return {
                saleId: sale._id,
                supplierName: sale.SupplierId?.supplierName || "Unknown",
                email: sale.SupplierId?.email || "",
                customerphoneNumber: sale.SupplierId?.phoneNumber,
                customerAddress: sale.SupplierId?.address,
                saleDate: sale.PurchaseDate,
                PurchaseType: sale.PurchaseType,
                total: total,
                customerId: sale.SupplierId?._id,
                Items: sale.Items
            };
        });

        res.json({ data: formattedSales });
    } catch (err) {
        console.error("Error fetching sales:", err);
        res.status(500).json({ error: "Server error" });
    }
};


// Get Sale by ID
exports.getPurchaseById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate("SupplierId", " _id name email")
            .populate("Items.id", "name costPrice salePrice qty");
        if (!sale) return res.status(404).json({ error: "Sale not found" });
        res.json({ data: sale });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.updatePurchase = async (req, res) => {
    try {
        const { id } = req.params; // saleId from URL
        const { SupplierId, PurchaseDate, PurchaseType, Items } = req.body;

        if (!SupplierId || !PurchaseDate || !Items || Items.length === 0) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Calculate Grand Total
        const GrandTotal = Items.reduce((acc, curr) => acc + curr.qty * curr.costPrice, 0);

        const updatedSale = await Sale.findByIdAndUpdate(
            id,
            {
                SupplierId,
                PurchaseDate,
                PurchaseType,
                Items,
                GrandTotal,
            },
            { new: true } // return updated doc
        )
            .populate("SupplierId", "companyName email")
            .populate("Items.id", "name");

        if (!updatedSale) {
            return res.status(404).json({ error: "Sale not found" });
        }

        res.json({ message: "Sale updated successfully ✅", data: updatedSale });
    } catch (err) {
        console.error("Error updating sale:", err);
        res.status(500).json({ error: "Server error" });
    }
};