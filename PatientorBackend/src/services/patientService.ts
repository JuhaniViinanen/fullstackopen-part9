import patients from "../data/patients";
import { Patient, PatientNoSSN } from "../types";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth, gender, occupation }
    ));
};

export default { getPatients, getPatientsNoSSN };