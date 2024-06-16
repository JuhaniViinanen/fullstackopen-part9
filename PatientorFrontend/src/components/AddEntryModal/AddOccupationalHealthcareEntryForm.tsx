import { useState, useRef, SyntheticEvent } from "react";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";
import { TextField, InputLabel, Select, SelectChangeEvent, MenuItem, Button, Grid, Divider, Checkbox, ListItemText } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
}

const AddOccupationalHealthcareEntryForm = ({diagnoses, onSubmit, onClose}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const [endDate, setEndDate] = useState("");
  const endDateRef = useRef<HTMLInputElement | null>(null);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    let entryValues: EntryFormValues  = {
      type: EntryType.Occupational,
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName
    };
    if (startDate || endDate) {
      entryValues = {...entryValues, sickLeave: { startDate, endDate }};
    }
    onSubmit(entryValues);
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
      <TextField
        margin="dense"
        label="Employer"
        fullWidth
        value={employerName}
        onChange={({target}) => setEmployerName(target.value)}
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
        Sickleave
      </Divider>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <TextField
          margin="dense"
          helperText="start date"
          fullWidth
          type="date"
          value={startDate}
          onChange={({target}) => setStartDate(target.value)}
          inputRef={startDateRef}
          onClick={() => startDateRef.current?.showPicker()}
        />
        <TextField
          margin="dense"
          helperText="end date"
          fullWidth
          type="date"
          value={endDate}
          onChange={({target}) => setEndDate(target.value)}
          inputRef={endDateRef}
          onClick={() => endDateRef.current?.showPicker()}
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

export default AddOccupationalHealthcareEntryForm;