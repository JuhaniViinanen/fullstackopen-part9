// type BetterOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria?: string;
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.Occupational;
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PatientNonSensitive = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export enum EntryType {
    Hospital = "Hospital",
    Occupational = "OccupationalHealthcare",
    HealthCheck = "HealthCheck",
}

export enum HealthCheckRating {
    "Healthy",
    "LowRisk",
    "HighRisk",
    "CriticalRisk"
}