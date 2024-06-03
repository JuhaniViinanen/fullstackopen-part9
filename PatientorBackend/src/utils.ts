import { NewPatient, Gender } from "./types";

const isString = (s: unknown): s is string => {
    return typeof s === "string" || s instanceof String;
};

const parseString = (s: unknown, prop: string): string => {
    // leaving the !s here makes empty strings throw errors
    // since none of our properties are optional
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

export const toNewPatientEntry = (body: unknown): NewPatient => {
    if (!body || typeof body !== "object") {
        throw new Error("Incorrect or missing data");   
    }
    if ("name" in body && "dateOfBirth" in body && "ssn" in body && "gender" in body && "occupation" in body) {
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