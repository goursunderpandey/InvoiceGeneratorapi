const Sale = require("../Modal/Sales.modal");

// Add Sale
exports.createSale = async (req, res) => {
    try {
        const { CustomerId, SaleDate, SaleType ,Items } = req.body;

        if (!CustomerId || !Items || !SaleType || Items.length === 0) {
            return res.status(400).json({ error: "CustomerId and Items are required" });
        }

        // Calculate Grand Total
        const grandTotal = Items.reduce((acc, item) => acc + item.qty * item.salePrice, 0);

        const newSale = new Sale({
            CustomerId,
            SaleDate,
            SaleType,
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
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("CustomerId", "_id companyName email phoneNumber address gstNo")
            .populate("Items.id", "name");

        const formattedSales = sales.map((sale) => {
            const total = sale.Items.reduce((acc, item) => {
                return acc + (item.qty * item.salePrice);
            }, 0);



            return {
                saleId: sale._id,
                customerName: sale.CustomerId?.companyName || "Unknown",
                customerEmail: sale.CustomerId?.email || "",
                customerphoneNumber : sale.CustomerId?.phoneNumber,
                customerAddress : sale.CustomerId?.address,
                customergstNo : sale.CustomerId?.gstNo,
                saleDate: sale.SaleDate,
                SaleType : sale.SaleType,
                total: total,
                customerId: sale.CustomerId?._id,
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
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate("CustomerId", " _id name email")
            .populate("Items.id", "name costPrice salePrice qty");
        if (!sale) return res.status(404).json({ error: "Sale not found" });
        res.json({ data: sale });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.updateSale = async (req, res) => {
    try {
        const { id } = req.params; // saleId from URL
        const { CustomerId, SaleDate,SaleType, Items } = req.body;

        if (!CustomerId || !SaleDate || !Items || Items.length === 0) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Calculate Grand Total
        const GrandTotal = Items.reduce((acc, curr) => acc + curr.qty * curr.salePrice, 0);

        const updatedSale = await Sale.findByIdAndUpdate(
            id,
            {
                CustomerId,
                SaleDate,
                SaleType,
                Items,
                GrandTotal,
            },
            { new: true } // return updated doc
        )
            .populate("CustomerId", "companyName email")
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