import { useState, useRef, SyntheticEvent } from "react";
import { Diagnosis, EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import { TextField, InputLabel, Select, SelectChangeEvent, MenuItem, Button, Grid, ListItemText, Checkbox, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
}

const AddHealthCheckEntryForm = ({diagnoses, onSubmit, onClose}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryType.HealthCheck,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating
    });
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const val = event.target.value;
    setDiagnosisCodes(
      typeof val === "string" ? val.split(",") : val
    );
  };

  const onHealtCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealthCheckRating(Number(event.target.value));
  };

  return (
    <form onSubmit={submit}>
      <TextField
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

      <FormLabel>Health check rating</FormLabel>
      <RadioGroup
        value={healthCheckRating}
        onChange={onHealtCheckRatingChange}
      >
        <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio />} label={"Healthy"} />
        <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio />} label={"Low risk"} />
        <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio />} label={"High risk"} />
        <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio />} label={"Critical risk"} />
      </RadioGroup>
      
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

export default AddHealthCheckEntryForm;