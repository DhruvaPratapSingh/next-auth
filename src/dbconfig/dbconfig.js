import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(uri);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected");
        });
        connection.on("error", (err) => {
            console.log("Connection error: " + err);
            process.exit(1);
        });
    } catch (err) {
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
}
