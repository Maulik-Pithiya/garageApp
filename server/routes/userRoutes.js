import express from "express";
import { createMessage } from "../controller/userController.js";
import { getMessages } from "../controller/userController.js";
import { deleteMessage } from "../controller/userController.js";

const route = express.Router();

route.post("/message", createMessage);
route.get("/allmessages",getMessages);
route.delete("/delete/message/:id", deleteMessage);
export default route;