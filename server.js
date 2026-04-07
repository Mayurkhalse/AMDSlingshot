import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "dist")));

// React routing support
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// IMPORTANT: Listen on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});