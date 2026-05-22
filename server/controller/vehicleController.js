import Vehicle from "../model/vehicleModel.js";

// Create a new vehicle listing
export const createVehicle = async (req, res) => {
    try {
        const { name, location, price, kilometers, fuelType, passingYear, transmission, category, images } = req.body;

        // Simple validation
        if (!name || !location || !price || !kilometers || !fuelType || !passingYear || !transmission || !images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ message: "All fields are required and must contain at least one image URL." });
        }

        const newVehicle = new Vehicle({
            name,
            location,
            price,
            kilometers,
            fuelType,
            passingYear,
            transmission,
            category: category || "four-wheel",
            images,
            visible: req.body.visible !== undefined ? req.body.visible : true
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all vehicle listings
export const getVehicles = async (req, res) => {
    try {
        const allVehicles = await Vehicle.find().sort({ date: -1 });
        res.status(200).json(allVehicles);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update an existing vehicle listing
export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicleExist = await Vehicle.findById(id);

        if (!vehicleExist) {
            return res.status(404).json({ message: "Vehicle listing not found." });
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete a vehicle listing
export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicleExist = await Vehicle.findById(id);

        if (!vehicleExist) {
            return res.status(404).json({ message: "Vehicle listing not found." });
        }

        await Vehicle.findByIdAndDelete(id);
        res.status(200).json({ message: "Vehicle listing deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get configuration settings
export const getAppConfig = async (req, res) => {
    try {
        res.status(200).json({
            uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "prakash_auto_products",
            adminToken: process.env.ADMIN_SECRET_KEY || "PrakashAutoAdminSecretKey2026",
            cloudName: process.env.CLOUDINARY_CLOUD_NAME || "dytjsoyyz"
        });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
