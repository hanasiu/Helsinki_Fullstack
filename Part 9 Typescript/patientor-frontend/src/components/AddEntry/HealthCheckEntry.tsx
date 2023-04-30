import { useState, useEffect } from "react";
import { Diagnosis, AddEntryProps, EasyDiagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import style from "./style";

import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography
} from "@mui/material";

const HealthCheckEntry = ({
  patientInfo,
  setPatientInfo,
  setMessage
}: AddEntryProps) => {
  const [newDescription, setDescription] = useState("");
  const [newDate, setDate] = useState("");
  const [newSpecialist, setSpecialist] = useState("");
  const [newHealthrating, setHealthrating] = useState(Number(0));
  const [newCodeArray, setCodeArray] = useState<Array<Diagnosis["code"]>>([]);
  const [newDiagnosisCode, setDiagnosisCode] = useState<Diagnosis["code"] | "">(
    ""
  );
  const [diagnoses, setDiagnoses] = useState<EasyDiagnosis[] | null>(null);

  useEffect(() => {
    async function fetchDiagnoses() {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    }
    fetchDiagnoses();
  }, []);

  const addCodeArray = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const foundCode = diagnoses?.find((e) => e.code === newDiagnosisCode);
    if (foundCode && !newCodeArray.find((e) => e === newDiagnosisCode)) {
      setCodeArray(newCodeArray.concat(newDiagnosisCode));
      setDiagnosisCode("");
    } else {
      setMessage(
        "diagnosis code not found, or same diagnosis code already added"
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setDiagnosisCode("");
    }
  };
  const addHealthCheckEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      description: newDescription,
      date: newDate,
      specialist: newSpecialist,
      healthCheckRating: newHealthrating,
      diagnosisCodes: newCodeArray,
      type: "HealthCheck"
    };
    try {
      const addedEntry = await patientService.createEntry(
        entryToAdd,
        patientInfo?.id as string
      );
      patientInfo
        ? setPatientInfo({
            ...patientInfo,
            entries: patientInfo.entries.concat(addedEntry)
          })
        : setMessage("error: patient is not here");
      console.log(patientInfo?.entries);
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthrating(0);
      setCodeArray([]);
    } catch (e: any) {
      console.log(e);
      console.log(newHealthrating);
      setMessage(e.response.data);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={style}>
      <Typography variant="h5">New Health Check Entry</Typography>
      <br />
      <form onSubmit={addHealthCheckEntry}>
        <TextField
          label="Description"
          value={newDescription}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        ></TextField>
        <TextField
          type="date"
          value={newDate}
          onChange={({ target }) => setDate(target.value)}
          fullWidth
        ></TextField>
        <TextField
          label="Specialist"
          value={newSpecialist}
          onChange={({ target }) => setSpecialist(target.value)}
          fullWidth
        ></TextField>
        <InputLabel style={{ marginTop: 20 }}>Healthcheck Rating</InputLabel>
        <Select
          label="Healthcheck Rating"
          value={newHealthrating}
          onChange={({ target }) => setHealthrating(Number(target.value))}
          fullWidth
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>LowRisk</MenuItem>
          <MenuItem value={2}>HighRisk</MenuItem>
          <MenuItem value={3}>CriticalRisk</MenuItem>
        </Select>
        <div>
          Diagnoses Codes
          <div style={style}>
            {newCodeArray.length !== 0 ? `${newCodeArray}` : ""}
          </div>
        </div>
        <Button type="submit" variant="outlined">
          Add Entry
        </Button>
      </form>
      <div>
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Code</InputLabel>
        <Select
          label="Diagnosis Code"
          value={newDiagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
          sx={{ height: 20, width: 115 }}
        >
          {diagnoses?.map((diagnose) => (
            <MenuItem
              key={diagnose.code}
              value={diagnose.code}
            >{`${diagnose.code}`}</MenuItem>
          ))}
        </Select>
        <Button onClick={addCodeArray}>Add Diagnosis Code</Button>
      </div>
    </div>
  );
};

export default HealthCheckEntry;
