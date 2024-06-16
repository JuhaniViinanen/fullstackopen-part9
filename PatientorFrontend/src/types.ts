type BetterOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

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

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.Occupational;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
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
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type EntryFormValues = BetterOmit<Entry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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