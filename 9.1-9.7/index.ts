import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import express from "express";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.end("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight }= req.query;

    if ( !height || isNaN(Number(height)) ) {
        return res.status(400).send({ error: "malformatted parameters" });
    }
    if ( !weight || isNaN(Number(weight)) ) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    return res.send({ height, weight, bmi: calculateBMI(Number(height), Number(weight))});
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if ( !daily_exercises || !target) {
        return res.status(400).send({ error: "parameters missing" });
    }
    if ( isNaN(Number(target)) || daily_exercises.some(isNaN) ) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
