import { Entry, Diagnosis } from "../../types";

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntries = ({entries, diagnoses} : Props) => {

  const codeToDescription = (code: string) : string | undefined=> {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  return (
    <div>
      <h5>{"Entries"}</h5>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {entries.map((entry: Entry) => (
          <li key={entry.id}>
            {`${entry.date} ${entry.description}`}
            {entry.diagnosisCodes &&
              <ul style={{ listStyle: "initial" }}>
                {entry.diagnosisCodes.map((diagcode: string) => (
                  <li key={diagcode}>
                    {`${diagcode} ${codeToDescription(diagcode)}`}
                  </li>
                ))}
              </ul>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientEntries;