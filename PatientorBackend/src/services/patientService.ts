import patients from "../data/patients";
import { Patient, PatientNonSensitive, NewPatient } from "../types";
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

export default { getPatients, getPatientsNonSensitive, addPatient, getPatientById };