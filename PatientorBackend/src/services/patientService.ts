import patients from "../data/patients";
import { Patient, PatientNoSSN, NewPatient } from "../types";
import { v4 } from "uuid";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth, gender, occupation }
    ));
};

const addPatient = (patient: NewPatient): Patient => {
    const patientToAdd = { id: v4(), ...patient};
    patients.push(patientToAdd);
    return patientToAdd;
};

export default { getPatients, getPatientsNoSSN, addPatient };