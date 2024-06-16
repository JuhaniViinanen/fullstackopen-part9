import { useState, useRef, SyntheticEvent } from "react";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";
import { TextField, InputLabel, Select, SelectChangeEvent, MenuItem, Button, Grid, Divider, Checkbox, ListItemText } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
}

const AddHospitalEntryForm = ({diagnoses, onSubmit, onClose}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0,10));
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().substring(0,10));
  const dischargeDateRef = useRef<HTMLInputElement | null>(null);
  const [criteria, setCriteria] = useState("");

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const discharge = !criteria ? { date: dischargeDate } : {date: dischargeDate, criteria};
    onSubmit({
      type: EntryType.Hospital,
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge
    });
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const val = event.target.value;
    setDiagnosisCodes(
      typeof val === "string" ? val.split(",") : val
    );
  };

  return (
    <form onSubmit={submit}>
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        value={description}
        onChange={({target}) => setDescription(target.value)}
      />
      <TextField
        margin="dense"
        label="Date"
        fullWidth
        type="date"
        value={date}
        onChange={({target}) => setDate(target.value)}
        inputRef={dateRef}
        onClick={() => dateRef.current?.showPicker()}
      />
      <TextField
        margin="dense"
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({target}) => setSpecialist(target.value)}
      />

      <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
      <Select
        label="Diagnosis codes"
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={onDiagnosisCodesChange}
        renderValue={(selected) => selected.join(", ")}
      >
        {diagnoses.map(diagnosis => 
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            <Checkbox checked={diagnosisCodes.findIndex(d => d === diagnosis.code) > -1} />
            <ListItemText primary={diagnosis.code} />
          </MenuItem>
        )}
      </Select>

      <Divider textAlign="left" style={{marginTop: 10}}>
        Discharge
      </Divider>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <TextField
          margin="dense"
          label="Date"
          fullWidth
          type="date"
          value={dischargeDate}
          onChange={({target}) => setDischargeDate(target.value)}
          inputRef={dischargeDateRef}
          onClick={() => dischargeDateRef.current?.showPicker()}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Criteria"
          value={criteria}
          onChange={({target}) => setCriteria(target.value)}
        />
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button color="secondary" variant="contained" type="button" onClick={onClose}>cancel</Button>
        <Button variant="contained" type="submit">add</Button>
      </Grid>
    </form>
  );
};

export default AddHospitalEntryForm;