import { useState, useEffect } from 'react'
import { DiaryEntry } from './types';
import Diaries from './components/Diaries';
import AddEntry from './components/AddEntry';
import { getAllDiaries } from './services/diaryService';


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data as DiaryEntry[])
    })
  }, [])

  return (
    <div>
      <AddEntry diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries}/>
    </div>
  )
}

export default App;