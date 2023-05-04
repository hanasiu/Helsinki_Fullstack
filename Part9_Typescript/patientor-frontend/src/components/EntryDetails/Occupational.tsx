import WorkIcon from "@mui/icons-material/Work";
import { OccupationalHealthcareEntry } from "../../types";

const Occupational = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
    <div>
      {entry.date} <WorkIcon/> {entry.employerName}
    </div>
    <div>{entry.description}</div>
    <div>{entry.sickLeave ? 
    `Sick leave: ${entry.sickLeave.startDate}~${entry.sickLeave.endDate}` :
    null}</div>
  </div>
  );
};

export default Occupational;
