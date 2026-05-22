import mongoose from "mongoose";

async function run() {
    try {
        await mongoose.connect("mongodb://localhost:27017/PrakashAuto");
        console.log("Connected to MongoDB");
        const vehicles = await mongoose.connection.db.collection("vehicles").find().toArray();
        console.log("Vehicles in Database:");
        console.log(JSON.stringify(vehicles, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
