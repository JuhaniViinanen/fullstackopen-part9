import { HospitalEntry as Hospentry, Diagnosis } from "../../types";
import { LocalHospital } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

interface Props {
  entry: Hospentry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses } : Props) => {

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
        <Tooltip title="Hospital">
          <LocalHospital style={{ color: "red" }} />
        </Tooltip>
      </div>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && 
        <ul>
          {entry.diagnosisCodes.map((diagcode: string) => (
            <li key={diagcode}>{`${diagcode} ${codeToDescription(diagcode)}`}</li>
          ))}
        </ul>
      }
      <ul style={{ listStyle: "none", marginTop: "1em", paddingLeft: "0" }} >
        <li>{`Discharge date: ${entry.discharge.date}`}</li>
        <li>{`Discharge criteria: ${entry.discharge.criteria}`}</li>
      </ul>
      <p>{`diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

export default HospitalEntry;