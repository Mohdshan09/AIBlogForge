import mongoose from "mongoose";

//connectDB
async function connectDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log(`mongodb connected`))
    .catch((error) => console.log(error.message));
}

export default connectDB;
