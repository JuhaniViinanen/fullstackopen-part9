import {
  HealthCheckEntry as HealthEntry,
  Diagnosis,
  HealthCheckRating } from "../../types";
import { Favorite, FactCheck } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

interface Props {
  entry: HealthEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses } : Props) => {

  const entryStyle = {
    border: "solid",
    borderRadius: "10px",
    padding: "0.5em",
    display: "inline-block",
    marginBottom: "0.5em"
  };

  const healthColours = ["green", "yellow", "orange", "red"];

  const codeToDescription = (code: string) : string | undefined=> {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  return (
    <div style={entryStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {entry.date}
        <Tooltip title={"Health Check"}>
          <FactCheck style={{ color: "green" }} />
        </Tooltip>
      </div>
      <p>{entry.description}</p>
      <Tooltip title={HealthCheckRating[entry.healthCheckRating]}>
        <Favorite style={{ color: healthColours[entry.healthCheckRating] }} />
      </Tooltip>
      {entry.diagnosisCodes && 
        <ul>
          {entry.diagnosisCodes.map((diagcode: string) => (
            <li key={diagcode}>{`${diagcode} ${codeToDescription(diagcode)}`}</li>
          ))}
        </ul>
      }
      <p>{`diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

export default HealthCheckEntry;