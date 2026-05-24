import express from "express";
import bodyParser from "body-parser";
import configDotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/userRoutes.js";
import vehicleRoute from "./routes/vehicleRoutes.js";
import productRoute from "./routes/productRoutes.js";
import cors from 'cors'


const app = express();
app.use(bodyParser.json());
app.use(cors());
configDotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("\nDB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api", route);
app.use("/api", vehicleRoute);
app.use("/api", productRoute);



// node indexedDB.js