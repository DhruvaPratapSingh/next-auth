import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongodb connected");
        })
        connection.on("error",(err)=>{
            console.log("connection err !" + err);
            process.exit();
        })

    } catch (err) {
        console.log("err to connect db",err);
    }
}