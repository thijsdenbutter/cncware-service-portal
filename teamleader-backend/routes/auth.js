import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Route om de gebruiker naar Teamleader's OAuth 2.0 autorisatiepagina te leiden
router.get("/login", (req, res) => {
    const authUrl = `https://focus.teamleader.eu/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;
    res.redirect(authUrl);
});

// Callbackroute die wordt aangeroepen na succesvolle authenticatie
router.get("/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("Autorisatiecode ontbreekt.");
    }

    try {
        const response = await axios.post("https://focus.teamleader.eu/oauth2/access_token", {
            grant_type: "authorization_code",
            code: code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
        });

        const { access_token, refresh_token } = response.data;
        console.log("✅ Access token ontvangen:", access_token);
        console.log("🔄 Refresh token ontvangen:", refresh_token);

        res.redirect(`http://localhost:5173/teamleader-auth?token=${access_token}`);

    } catch (error) {
        console.error("❌ Fout bij ophalen toegangstoken:", error.response?.data || error.message);
        res.status(500).send("Er is een fout opgetreden bij het ophalen van het toegangstoken.");
    }
});

export default router;
