export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type EasyDiagnosis = Omit<Diagnosis, "latin">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface sickLeave {
  startDate: string;
  endDate: string;
}

interface discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, "id">;

export type HospitalEntryInput = Omit<HospitalEntry, "id">; 

export type OccupationalInput = Omit<OccupationalHealthcareEntry, "id">; 

export type HealthCheckInput = Omit<HealthCheckEntry, 'id'>;

export interface AddEntryProps {
  patientInfo: Patient | null;
  setPatientInfo: React.Dispatch<React.SetStateAction<Patient | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}