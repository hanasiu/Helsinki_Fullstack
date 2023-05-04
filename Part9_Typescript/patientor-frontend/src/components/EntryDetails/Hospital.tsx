import { HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>{entry.description}</div>
      <div>Discharged on {entry.discharge.date}. Because: {entry.discharge.criteria}</div>
    </div>
  );
};

export default Hospital;
