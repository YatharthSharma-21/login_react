import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import cors from "cors";
import path from "path";
import userRoute from "./routes/userRoute.js";
import connectDB from "./DB_Connection/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Connect Database
connectDB();

const __dirname = path.resolve();
const directory = path.join(__dirname, '/uploads');


app.use("/api/save_details", userRoute);
app.use('/uploads', express.static(directory));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(chalk.yellow.bold("Server is running on port:", PORT))
);
