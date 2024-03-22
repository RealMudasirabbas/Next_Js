import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        console.log("Database is connected successfully")
        
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Mongoose is connected successfully");
        })

        connection.on("error", (error) => {
            console.log(" Try again to connect to Database", error)
        })

    } catch (error) {
        console.log("Something went wrong in trying to connect to Database", error)
    }
}