import { useState } from "react";
import { createDiary } from "../services/diaryService";
import { DiaryEntry, AddEntryProps } from "../types";
import { WeatherRadioButton, VisibilityRadioButton } from "./RadioButton";
import Notify from "./Notify";


const AddEntry = ({ diaries, setDiaries }: AddEntryProps) => {
  const [newDate, setDate] = useState("");
  const [newWeather, setWeather] = useState("");
  const [newVisibility, setVisibility] = useState("");
  const [newComment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    createDiary(diaryToAdd)
      .then((data) => {
        setDiaries(diaries.concat(data as DiaryEntry));
      })
      .catch((e) => {
        setMessage(e.toString());
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };
  return (
    <div>
      <h3>Add new entry</h3>
      <Notify message={message} />
      <form onSubmit={diaryCreation}>
        <div>
          Date{" "}
          <input
            type="date"
            value={newDate}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Weather{" "}
          <WeatherRadioButton newWeather={newWeather} setWeather={setWeather} />
        </div>
        <div>
          Visibility{" "}
          <VisibilityRadioButton newVisibility={newVisibility} setVisibility={setVisibility} />
        </div>
        <div>
          Comment{" "}
          <input
            value={newComment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddEntry;
