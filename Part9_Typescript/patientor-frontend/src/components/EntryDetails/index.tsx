import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import Occupational from "./Occupational";
import DiagnosesList from "./diagnosesList";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from "../../types";
import style from "./style";

import Typography from "@mui/material/Typography";


//refactoring if possible.
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Typography style={style}>
          <Hospital entry={entry as HospitalEntry} />
          <DiagnosesList entry={entry as Entry} />
        </Typography>
      );
    case "OccupationalHealthcare":
      return (
        <Typography style={style}>
          <Occupational entry={entry as OccupationalHealthcareEntry} />
          <DiagnosesList entry={entry as Entry} />
        </Typography>
      );
    case "HealthCheck":
      return (
        <Typography style={style}>
          <HealthCheck entry={entry as HealthCheckEntry} />
          <DiagnosesList entry={entry as Entry} />
        </Typography>
      );
    default:
      return null;
  }
};

export default EntryDetails;
