import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/admin.js";
import blogRouter from "./routes/blogs.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//port
const portNumber = 2000 || process.env.portNumber;

// mongoDB
connectDB(`${process.env.mongoDB_URI}/quickblog`);

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(portNumber, () => {
  console.log(`app is running on ${portNumber}`);
});

export default app;
