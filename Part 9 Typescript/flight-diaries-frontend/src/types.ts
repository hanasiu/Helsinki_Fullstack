export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
  export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }
  
  export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
  
  //export type NewDiaryEntry = Omit<DiaryEntry, "id">;

  export interface NewDiaryEntry {
    date: string;
    weather: string;
    visibility: string;
    comment?: string;
  }

  export interface AddEntryProps {
    diaries: DiaryEntry[];
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  }

  export interface WeatherStateType {
    newWeather: string;
    setWeather: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface VisibilityStateType {
    newVisibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
  }