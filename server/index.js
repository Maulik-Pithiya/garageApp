import express from "express";
import bodyParser from "body-parser";
import configDotenv from "dotenv";
import mangoose from "mongoose";
import route from "./routes/userRoutes.js";
import cors from 'cors'


const app = express();
app.use(bodyParser.json());
app.use(cors());
configDotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mangoose
    .connect(MONGOURL)
    .then(() => {
        console.log("\nDB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

    app.use("/api",route);

    
    // node indexedDB.js