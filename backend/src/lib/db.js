import mongoose from "mongoose"

export const ConnectDB = async () => {
try{
const conn = await mongoose.connect(process.env.MONGO_URL)
console.log(`MongoDB is connected : ${conn.connection.host}`)

}
catch(error){
console.log("Error in connecting to MongoDB", error)
process.exit(1);
}
}