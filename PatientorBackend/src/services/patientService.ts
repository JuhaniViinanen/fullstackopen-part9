import patients from "../data/patients";
import { Patient, Entry, PatientNonSensitive, NewPatient, NewEntry } from "../types";
import { v4 } from "uuid";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth, gender, occupation }
    ));
};

const getPatientById = (id: string) : Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const patientToAdd = { id: v4(), ...patient};
    patients.push(patientToAdd);
    return patientToAdd;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
    const patient = patients.find(p => p.id === id);
    if (patient) {
        const addedEntry = {id: v4(), ...entry};
        patient.entries.push(addedEntry);
        return addedEntry;
    }
    throw new Error("Patient id not found");
};

export default {
    getPatients,
    getPatientsNonSensitive,
    addPatient,
    getPatientById,
    addEntry
};