import './env.js';
import express from "express";
import cors from "cors";

import lookupRoutes from "./v1.0.0/routes/lookupRoutes.js";
import rolleRoutes from "./v1.0.0/routes/rolleRoutes.js";
import kommentarRoutes from "./v1.0.0/routes/kommentarRoutes.js";
import tiltakRoutes from "./v1.0.0/routes/tiltakRoutes.js";
import hendelseRoutes from "./v1.0.0/routes/hendelseRoutes.js";
import brukerRoutes from "./v1.0.0/routes/brukerRoutes.js";

const PORT = 3868;

const app = express();

// Middlewares
app.use(cors({
    origin: "*",
    credentials: true
}));

// Setup Routes
app.use('/api/v1.0.0/lookup', lookupRoutes);
app.use('/api/v1.0.0/roller', rolleRoutes);
app.use('/api/v1.0.0/kommentarer', kommentarRoutes);
app.use('/api/v1.0.0/tiltak', tiltakRoutes);
app.use('/api/v1.0.0/hendelser', hendelseRoutes);
app.use('/api/v1.0.0/brukere', brukerRoutes);

// Listen

app.listen(PORT, () => {
    console.log(`This HTTP app is running on port: ${PORT}`)
})