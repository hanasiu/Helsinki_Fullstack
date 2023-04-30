import {
  NewPatient,
  Gender,
  //Entry,
  Diagnosis,
  discharge,
  sickLeave,
  NewEntry,
  HospitalEntryInput,
  OccupationalInput,
  HealthCheckInput,
  HealthCheckRating
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown, memberName: string): string => {
  if (!isString(str) || str.length === 0) {
    throw new Error(`Incorrect or missing ${memberName}`);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

// const parseEntries = (entries: unknown): Entry[] => {
//   if (
//     !Array.isArray(entries) ||
//     !entries.every((entry) => typeof entry === "object")
//   ) {
//     throw new Error("Incorrect or missing entries");
//   }
//   return entries as Entry[];
// };

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      ssn: parseString(object.ssn, 'ssn'),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseString(object.occupation, 'occupation'),
      gender: parseGender(object.gender),
      entries: []
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDischarge = (object: unknown): discharge => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object) ||
    !isDate(object.date as string) ||
    !isString(object.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return object as discharge;
};

const parseSickleave = (object: unknown): sickLeave | undefined => {
  if(!object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)) {
      return undefined;
    }
  if (
    !isDate(object.startDate as string) ||
    !isDate(object.endDate as string)
  ) {
    throw new Error("Incorrect or missing sickLeave date");
  }
  return object as sickLeave;
};

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
//   if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<Diagnosis["code"]>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis["code"]>;
// };

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || !Array.isArray(object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object as Array<Diagnosis["code"]>;
};

const isHealthRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// const parseHealthRating = (rating: unknown): HealthCheckRating => {
//   if (!Number(rating) || !isHealthRating(Number(rating))) {
//     throw new Error("Incorrect or missing rating");
//   }

//   return Number(rating);
// };


const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthRating(Number(rating))) {
    throw new Error("Incorrect or missing rating");
  }

  return Number(rating);
};

const parseHospitalEntry = (object: HospitalEntryInput): HospitalEntryInput => {
    const HospitalEntry: HospitalEntryInput = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date),
      specialist: parseString(object.specialist, 'specialist'),
      discharge: parseDischarge(object.discharge),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: object.type as "Hospital"
     };
    return HospitalEntry;
};

const parseOccupationHealthcareEntry = (
  object: OccupationalInput
): OccupationalInput => {
    const OccupationalEntry: OccupationalInput = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date),
      specialist: parseString(object.specialist, 'specialist'),
      employerName: parseString(object.employerName, 'employer name'),
      sickLeave: parseSickleave(object.sickLeave),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: object.type as "OccupationalHealthcare",
    };
    return OccupationalEntry;
};

const parseHealthCheckEntry = (object: HealthCheckInput): HealthCheckInput => {
    const HealthCheckEntry: HealthCheckInput = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date),
      specialist: parseString(object.specialist, 'specialist'),
      healthCheckRating: parseHealthRating(object.healthCheckRating),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: object.type as "HealthCheck"
    };
    return HealthCheckEntry;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }
  switch (object.type) {
    case "Hospital":
      return parseHospitalEntry(object as HospitalEntryInput);
    case "OccupationalHealthcare":
      return parseOccupationHealthcareEntry(object as OccupationalInput);
    case "HealthCheck":
      return parseHealthCheckEntry(object as HealthCheckInput);
    default:
      throw new Error("entry type is incorrect or missing");
  }
};
