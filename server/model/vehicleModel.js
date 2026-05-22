import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    kilometers: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    passingYear: {
        type: Number,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "four-wheels", // "two-wheels" or "four-wheels"
    },
    images: {
        type: [String],
        required: true,
    },
    visible: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Vehicle", vehicleSchema);
