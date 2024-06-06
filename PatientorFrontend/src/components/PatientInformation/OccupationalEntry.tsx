import { OccupationalHealthcareEntry as OccuEntry, Diagnosis } from "../../types";
import { Business } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

interface Props {
  entry: OccuEntry;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = ({ entry, diagnoses } : Props) => {

  const entryStyle = {
    border: "solid",
    borderRadius: "10px",
    padding: "0.5em",
    display: "inline-block",
    marginBottom: "0.5em"
  };

  const codeToDescription = (code: string) : string | undefined=> {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  return (
    <div style={entryStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {entry.date}
        <div>
          {entry.employerName}
          <Tooltip title="Occupational Healthcare">
            <Business />
          </Tooltip>
        </div>
      </div>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && 
        <ul>
          {entry.diagnosisCodes.map((diagcode: string) => (
            <li key={diagcode}>{`${diagcode} ${codeToDescription(diagcode)}`}</li>
          ))}
        </ul>
      }
      {entry.sickLeave &&
        <ul style={{ listStyle: "none", marginTop: "1em", paddingLeft: "0" }} >
          <li>{`Sickleave start date: ${entry.sickLeave.startDate}`}</li>
          <li>{`Sickleave end date: ${entry.sickLeave.endDate}`}</li>
        </ul>
      }
      <p>{`diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

export default OccupationalEntry;