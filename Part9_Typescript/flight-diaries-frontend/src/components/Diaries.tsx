import { DiaryEntry } from '../types';

const Diaries = ({diaries}: {diaries: DiaryEntry[]}) => {
    return (
        <div>
          <h3>Diary entries</h3>
          {diaries.map(diary =>
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            <div>weather: {diary.weather}</div>
            <div>visibility: {diary.visibility}</div> 
          </div>
        )}      
        </div>
    );
}

export default Diaries;