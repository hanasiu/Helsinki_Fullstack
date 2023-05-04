import { useState, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";
import { EasyDiagnosis, Entry } from "../../types";

const DiagnosesList = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<EasyDiagnosis[] | null>(null);

  useEffect(() => {
    async function fetchDiagnoses() {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    }
    fetchDiagnoses();
  }, []);

  if (!diagnoses) return null;
  //hash if possible.
  return (
    <div>
      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code) => (
            <li key={code}>{`${code}: ${
              diagnoses?.find((diagnosis) => diagnosis.code === code)?.name
            }`}</li>
          ))
        : null}
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default DiagnosesList;
