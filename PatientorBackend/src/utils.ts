import { NewPatient, NewEntry, Gender, EntryType, HealthCheckRating, Diagnosis, SickLeave, Discharge } from "./types";

const isString = (s: unknown): s is string => {
    return typeof s === "string" || s instanceof String;
};

const parseString = (s: unknown, prop: string): string => {
    // leaving the !s here makes empty strings throw errors
    if (!s || !isString(s)) {
        throw new Error(`Incorrect or missing ${prop}`);
    }
    return s;
};

const isDate = (d: string): boolean => {
    return Boolean(Date.parse(d));
};

const parseDate = (d: unknown, prop: string): string => {
    if (!isString(d) || !isDate(d)) {
        throw new Error(`Incorrect or missing ${prop}`);
    }
    return d;
};

const isGender = (g: string): g is Gender => {
    return Object.values(Gender).map(gender => gender.toString()).includes(g);
};

const parseGender = (g: unknown, prop: string): Gender => {
    if (!isString(g) || !isGender(g)) {
        throw new Error(`Incorrect or missing ${prop}`);
    }
    return g;
};

const isHealthCheckRating = (r: number): r is HealthCheckRating => {
    const temp = Object.values(HealthCheckRating).map(rating => Number(rating));
    return temp.includes(r);
};

const parseHealthCheckRating = (r: unknown, prop: string): HealthCheckRating => {
    if (isNaN(Number(r)) || !isHealthCheckRating(Number(r))) {
        throw new Error(`Incorrect or missing ${prop}`);
    }
    return Number(r);
};

const parseDiagnosisCodes = (codes: unknown[], prop: string): Array<Diagnosis["code"]> => {
    return codes.map(diagnosis => parseString(diagnosis, prop));
};

const isEntryType = (t: string): t is EntryType => {
    return Object.values(EntryType).map(type => type.toString()).includes(t);
};

const parseSickLeave = (leave: object): SickLeave => {
    if ("startDate" in leave && "endDate" in leave) {
        return {
            startDate: parseString(leave.startDate, "sickLeave.startDate"),
            endDate: parseString(leave.endDate, "sickLeave.endDate")
        };
    }
    throw new Error("Incorrect or missing data");
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (discharge && typeof discharge === "object" && "date" in discharge) {
        const date = parseDate(discharge.date, "discharge.date");
        let criteria: string = "";
        if ("criteria" in discharge) {
            criteria = parseString(discharge.criteria, "discharge.criteria");
        }
        return criteria ? {date, criteria} : { date };
    }
    throw new Error("Incorrect or missing discharge");
};

export const toNewPatientEntry = (body: unknown): NewPatient => {
    if (!body || typeof body !== "object") {
        throw new Error("Incorrect or missing data");   
    }
    if ("name" in body &&
        "dateOfBirth" in body &&
        "ssn" in body &&
        "gender" in body &&
        "occupation" in body) {
        const newPatient: NewPatient = {
            name: parseString(body.name, "name"),
            ssn: parseString(body.ssn, "ssn"),
            dateOfBirth: parseDate(body.dateOfBirth, "dateOfBirth"),
            gender: parseGender(body.gender, "gender"),
            occupation: parseString(body.occupation, "occupation"),
            entries: [],
        };
        return newPatient;
    }
    throw new Error("Requested fields are missing");
};

export const toNewEntry = (body: unknown): NewEntry => {
    if (!body || typeof body !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("type" in body && isString(body.type) && isEntryType(body.type)) {
        switch (body.type) {
            case EntryType.HealthCheck:
                return toNewHealtCheckEntry(body);
            case EntryType.Occupational:
                return toNewOccupationalHealthcareEntry(body);
            case EntryType.Hospital:
                return toNewHospitalEntry(body);
        }
    }
    throw new Error("Icorrect or missing entry type.");
};

const toNewHealtCheckEntry = (body: object): NewEntry => {
    if (
        "date" in body &&
        "specialist" in body &&
        "description" in body &&
        "healthCheckRating" in body
    ) {
        let newEntry: NewEntry = {
            type: EntryType.HealthCheck,
            date: parseDate(body.date, "date"),
            specialist: parseString(body.specialist, "specialist"),
            description: parseString(body.description, "description"),
            healthCheckRating: parseHealthCheckRating(body.healthCheckRating, "healthCheckRating"),
        };
        if ("diagnosisCodes" in body && Array.isArray(body.diagnosisCodes)) {
            const diagnosisCodes: Array<Diagnosis["code"]> = parseDiagnosisCodes(body.diagnosisCodes, "diagnosisCodes");
            newEntry = {...newEntry, diagnosisCodes};
        }
        return newEntry;
    }
    throw new Error("Requested fields are missing");
};

const toNewOccupationalHealthcareEntry = (body: object): NewEntry => {
    if (
        "date" in body &&
        "specialist" in body &&
        "description" in body &&
        "employerName" in body
    ) {
        let newEntry: NewEntry = {
            type: EntryType.Occupational,
            date: parseDate(body.date, "date"),
            specialist: parseString(body.specialist, "specialist"),
            description: parseString(body.description, "description"),
            employerName: parseString(body.employerName, "employerName")
        };
        if ("diagnosisCodes" in body && Array.isArray(body.diagnosisCodes)) {
            const diagnosisCodes: Array<Diagnosis["code"]> = parseDiagnosisCodes(body.diagnosisCodes, "diagnosisCodes");
            newEntry = {...newEntry, diagnosisCodes};
        }
        if ("sickLeave" in body && typeof body.sickLeave === "object" && body.sickLeave) {
            const sickLeave: SickLeave = parseSickLeave(body.sickLeave);
            newEntry = {...newEntry, sickLeave};
        }
        return newEntry;
    }
    throw new Error("Requested fields are missing");
};

const toNewHospitalEntry = (body: object): NewEntry => {
    if (
        "date" in body &&
        "specialist" in body &&
        "description" in body &&
        "discharge" in body
    ) {
        let newEntry: NewEntry = {
            type: EntryType.Hospital,
            date: parseDate(body.date, "date"),
            specialist: parseString(body.specialist, "specialist"),
            description: parseString(body.description, "description"),
            discharge: parseDischarge(body.discharge),
        };
        if ("diagnosisCodes" in body && Array.isArray(body.diagnosisCodes)) {
            const diagnosisCodes: Array<Diagnosis["code"]> = parseDiagnosisCodes(body.diagnosisCodes, "diagnosisCodes");
            newEntry = {...newEntry, diagnosisCodes};
        }
        return newEntry;
    }
    throw new Error("Requested fields are missing");
};