import { useState ,useEffect } from "react";
import { useMatch } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { Male, Female } from "@mui/icons-material";
import { Gender } from "../../types";
import PatientEntries from "./PatientEntries";

const PatientInformation = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState("");
  const match = useMatch("/patients/:id");
  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      if (id) {
        try {
          const patient = await patientService.getById(id);
          setPatient(patient);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            setError(`${err.message} ${err.response?.statusText}`);
          } else {
            console.log("Unknown error", err);
            setError("Unknown error");
          }
        }
      } else {
        setPatient(undefined);
      }
    };
    fetchPatient(match?.params.id);
  }, [match]);

  return (
    <div>
      {error && <div style={{ backgroundColor: "red" }}>{error}</div>}
      {patient && 
        <div>
          <h4>
            {patient.name}
            {patient.gender === Gender.Male && <Male />}
            {patient.gender === Gender.Female && <Female />}
          </h4>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {patient.ssn && <li>{`ssn: ${patient.ssn}`}</li>}
            {patient.dateOfBirth && <li>{`date of birth: ${patient.dateOfBirth}`}</li>}
            <li>{`occupation: ${patient.occupation}`}</li>
          </ul>
          {patient.entries.length !== 0 && <PatientEntries entries={patient.entries} />}
        </div>
      }
    </div>
  );
};

export default PatientInformation;