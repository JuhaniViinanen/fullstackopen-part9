import express from "express";
import diagnosesRouter from "./routers/diagnoses";
import patientsRouter from "./routers/patients";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    console.log("ping");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});