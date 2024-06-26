import { useState ,useEffect } from "react";
import { useMatch } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { Male, Female } from "@mui/icons-material";
import { Gender, EntryFormValues } from "../../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInformation = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  
  const match = useMatch("/patients/:id");
  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      if (id) {
        try {
          const patient = await patientService.getById(id);
          setPatient(patient);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            showError(`${err.message} ${err.response?.statusText}`);
          } else {
            console.log("Unknown error", err);
            showError("Unknown error");
          }
        }
      } else {
        setPatient(undefined);
      }
    };
    fetchPatient(match?.params.id);
  }, [match]);

  const showError = (error: string) => {
    setError(error);
    setTimeout(() => setError(""), 10000);
  };

  const closeModal = (): void => {
    setFormError("");
    setModalType("");
    setModalOpen(false);
  };

  const addEntry = async (entry: EntryFormValues) => {
    if (patient) {
      try {
        const newEntry = await patientService.addEntry(patient.id, entry);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        closeModal();
      } catch( e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            setFormError(e.response.data);
          } else {
            console.log(e);
            setFormError("Unrecognized axios error");
          }
        } else {
          console.log(e);
          setFormError("Unknown error");
        }
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            modalType={modalType}
            setModalType={setModalType}
            onClose={closeModal}
            onSubmit={addEntry}
            error={formError}
            diagnoses={diagnoses}
          />
          <Button variant="contained" onClick={() => setModalOpen(true)} >Add New Entry</Button>
          <h5>{"Entries"}</h5>
          {patient.entries.length !== 0 &&
            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
              {patient.entries.map(entry => (
                <li key={entry.id}>
                  <EntryDetails entry={entry} diagnoses={diagnoses} />
                </li>
              ))}
            </ul>
          }
        </div>
      }
    </div>
  );
};

export default PatientInformation;