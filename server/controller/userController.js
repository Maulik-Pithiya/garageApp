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
        if(allMessages.length === 0) {
            return res.status(404).json({ message: "No Records found" });
        }
        res.status(200).json(allMessages);            
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
