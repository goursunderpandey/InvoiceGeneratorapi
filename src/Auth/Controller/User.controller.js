const User = require("../Model/User.modal");
const mongoose = require("mongoose")



exports.Userdetiles = async (req, res) => {
    try {
        const {
            ID, // This will be present for updates
            firstName,
            UserId,
            lastName,
            companyName,
            GST_NO,
            phone,
            address,
            country,
            state,
            city,
            postalCode,
        } = req.body;

        // Check if we're updating an existing record
        if (ID && ID !== 0 && ID !== '' && mongoose.Types.ObjectId.isValid(ID)) {
            // UPDATE EXISTING RECORD
            const updateData = {
                firstName,
                lastName,
                companyName,
                GST_NO,
                phone,
                address,
                country,
                state,
                city,
                postalCode,
            };

            // Add profile image only if a new file was uploaded
            const currentYear = new Date().getFullYear();
            if (req.file) {
                updateData.profileImage = `${req.file.filename}`;
            }

            const updatedUser = await User.findByIdAndUpdate(
                ID,
                updateData,
                {
                    new: true, // Return updated document
                    runValidators: true // Run model validations
                }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: updatedUser
            });

        } else {
            // CREATE NEW RECORD
            // Check if user already exists with this UserId
            const existingUser = await User.findOne({ UserId });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User details already exist for this user ID"
                });
            }

            // Check if username already exists
            const existingUsername = await User.findOne({ companyName });
            if (existingUsername) {
                return res.status(400).json({
                    success: false,
                    message: "companyName already exists"
                });
            }
            const currentYear = new Date().getFullYear();
            const newUser = new User({
                firstName,
                UserId,
                lastName,
                companyName,
                GST_NO,
                phone,
                address,
                country,
                state,
                city,
                postalCode,
                profileImage: req.file ? `${req.file.filename}` : null,
            });

            await newUser.save();

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                user: newUser
            });
        }

    } catch (error) {
        console.error("Error in Userdetiles:", error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.getUserDetailsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Valid User ID is required"
            });
        }

        const userDetails = await User.findOne({ UserId: userId })
            .lean()
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User details not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            data: userDetails
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};