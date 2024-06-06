import { Entry } from "../../types";

interface Props {
  entries: Entry[]
}

const PatientEntries = ({entries} : Props) => {
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
                    {diagcode}
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