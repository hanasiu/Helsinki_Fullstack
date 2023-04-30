import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};



const addPatient = (entry: NewPatient):Patient => {
    const id:string = uuid();
    const newPatient = {
      id,
      ...entry
    };
    patients.push(newPatient);

  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const entryId:string = uuid();
  const newEntry: Entry = {
    id: entryId,
    ...entry
  };
  patients.find(patient => patient.id = patientId)?.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getOnePatient,
  addPatient,
  getPublicPatients,
  addEntry
};