import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Hier voeg je je routes toe
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Welkom op de Teamleader Backend!");
});

app.use("/auth", authRoutes);

app.listen(3001, () => {
    console.log("✅ Server draait op http://localhost:3001");
});
