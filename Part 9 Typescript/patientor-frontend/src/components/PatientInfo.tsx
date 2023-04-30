import { useParams } from "react-router-dom";
import patientService from "../services/patients";

import { useState, useEffect } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import GirlIcon from "@mui/icons-material/Girl";
import EntryDetails from "./EntryDetails/index";
import HospitalEntry from "./AddEntry/HospitalEntry";
import HealthCheckEntry from "./AddEntry/HealthCheckEntry";
import OccupationalEntry from "./AddEntry/OccupationalEntry";
import Notify from "./Notify";

import { Patient, Entry } from "../types";

import { Button, Typography } from "@mui/material";

const PatientInfo = () => {
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newSelect, setSelect] = useState("");

  const id = useParams().id;

  useEffect(() => {
    async function fetchPatient() {
      const patient = await patientService.getOnePatient(id?.toString());
      setPatientInfo(patient);
    }
    fetchPatient();
  }, [id]);

  const handleSelectClick = (button: string) => {
    setSelect(button);
  };

  let selectedEntry = null;
  switch (newSelect) {
    case "Hospital":
      selectedEntry = (
        <HospitalEntry
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          setMessage={setMessage}
        />
      );
      break;
    case "Occupational":
      selectedEntry = (
        <OccupationalEntry
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          setMessage={setMessage}
        />
      );
      break;
    case "HealthCheck":
      selectedEntry = (
        <HealthCheckEntry
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          setMessage={setMessage}
        />
      );
      break;
    default:
      break;
  }

  if (!patientInfo) {
    return null;
  }
  return (
    <div>
      <br/>
      <Typography variant="h4">
        {patientInfo.name}{" "}
        {patientInfo.gender === "male" ? (
          <BoyIcon />
        ) : patientInfo.gender === "female" ? (
          <GirlIcon />
        ) : null}
      </Typography>
      <br/>
      <Typography>ssn: {patientInfo.ssn}</Typography>
      <Typography>Occupation: {patientInfo.occupation}</Typography>
      <br/>
      <Notify message={message} />
      <Button
        onClick={() => handleSelectClick("Hospital")}
        variant="outlined"
      >
        Hospital Entry
      </Button>
      <Button
        onClick={() => handleSelectClick("Occupational")}
        variant="outlined"
      >
        Occupational HealthCare Entry
      </Button>
      <Button
        onClick={() => handleSelectClick("HealthCheck")}
        variant="outlined"
      >
        Health Check Entry
      </Button>
      <Button
        onClick={() => handleSelectClick("")}
        variant="outlined"
        color="error"
      >
        Cancel
      </Button>
      <br/>
      {selectedEntry}
      <br/>
      <Typography variant="h5">Entries</Typography>
      {patientInfo?.entries?.length === 0 ? (
        <div>none</div>
      ) : (
        patientInfo?.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry as Entry} />
        ))
      )}
    </div>
  );
};

export default PatientInfo;
