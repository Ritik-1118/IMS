import express from "express";
import cors from "cors"
import env from "dotenv"
const app = express();
import cookieParser from 'cookie-parser';
import connectDB from "./utils/db.js";
import inventoryRouter from "./routes/inventory.js";
import orderRouter from "./routes/orders.js"
import supplierRouter from "./routes/suppliers.js"
import authUserRouter from "./routes/authuser.js"
import { adminMiddleware } from "./middlewares/adminMiddleware.js"; 
import authMiddleware from "./middlewares/authMiddleware.js";

env.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
    origin: "https://ims-beryl.vercel.app",
    methods:"POST,GET,PATCH,PUT,DELETE,HEAD",
    credentials: true,
}));

app.use("/api/user",authUserRouter)
app.use("/api/inventory",adminMiddleware, authMiddleware, inventoryRouter);
app.use("/api/orders", authMiddleware, orderRouter);
app.use("/api/supplier",adminMiddleware, authMiddleware, supplierRouter);

const PORT = process.env.PORT || 8000;
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${PORT}`);
    connectDB();
});