import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaries = () => {
   return axios
   .get<DiaryEntry[]>(baseUrl)
   .then(response => response.data); 
}

export const createDiary = (object: NewDiaryEntry) => {
    return axios
    .post<NewDiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch(error => {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data);
          } else {
            throw new Error("An error occurred");
          }
    });
}