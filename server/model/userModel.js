import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
    },
    
    phone: {
        type: Number,
        required: true,
    },
    
    message: {
        type: String,
    }
    
})
export default mongoose.model("UserMessage", userSchema);
