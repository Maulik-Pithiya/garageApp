import userModel from "../model/userModel.js";

export const createMessage = async (req, res) => {
    try {
        const newMessage = new userModel(req.body);
        const saveData = await newMessage.save();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(404).json({ errorMessage: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const allMessages = await userModel.find();
        res.status(200).json(allMessages); // Returns [] if empty, which is standard REST practice
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found. " });
        }
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User Deleted successfully." });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }

}