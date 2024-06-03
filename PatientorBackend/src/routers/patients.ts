import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatientsNonSensitive());
});

router.get("/:id", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.send(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Error in patient creation: ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;