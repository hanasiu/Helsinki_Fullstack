import diagnoses from '../../data/diagnoses';

import { Diagnosis, EasyDiagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getEasyDiagnoses = (): EasyDiagnosis[] => {
    return diagnoses.map(({code, name}) => ({
        code,
        name
    }));
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  getEasyDiagnoses,
  addDiagnose
};