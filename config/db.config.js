import mongoose from "mongoose";
const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION);
        // console.log(`MongoDB connected to ${conn.connection.host}: ${conn.connection.port}`)
        console.log("MongoDB connected successfully")
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}
export default db;