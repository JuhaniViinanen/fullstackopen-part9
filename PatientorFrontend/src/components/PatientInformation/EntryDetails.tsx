import { Entry, EntryType, Diagnosis } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import HealthCheckEntry from "./HealthCheckEntry";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (val: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(val)}`);
};

const EntryDetails = ({ entry, diagnoses } : Props) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case EntryType.Occupational:
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;