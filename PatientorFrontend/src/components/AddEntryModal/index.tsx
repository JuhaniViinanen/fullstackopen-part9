import { Dialog, DialogTitle, DialogContent, Divider, Alert, Button, ButtonGroup } from '@mui/material';
import { EntryFormValues, Diagnosis } from "../../types";
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';

interface Props {
  modalOpen: boolean;
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  modalType,
  setModalType,
  onClose,
  onSubmit,
  error,
  diagnoses
}: Props) => {

  const type_buttons = [
    <Button key="Health check" onClick={() => setModalType("Health check")}>Healthcheck entry</Button>,
    <Button key="Hospital" onClick={() => setModalType("Hospital")}>Hospital entry</Button>,
    <Button key="Occupational" onClick={() => setModalType("Occupational")}>Occupational Healthcare entry</Button>
  ];

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>
        {modalType ? `Add new ${modalType} entry` : "Select entry type"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {!modalType && <ButtonGroup variant="contained">{type_buttons}</ButtonGroup>}
        {modalType === "Health check" &&
        <AddHealthCheckEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onClose={onClose} />
        }
        {modalType === "Hospital" &&
        <AddHospitalEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onClose={onClose} />
        }
        {modalType === "Occupational" &&
        <AddOccupationalHealthcareEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onClose={onClose} />
        }
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;