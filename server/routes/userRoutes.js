import express from "express";
import { createMessage } from "../controller/userController.js";
import { getMessages } from "../controller/userController.js";

const route = express.Router();

route.post("/message", createMessage);
route.get("/allmessages",getMessages);
export default route;