import { useState, useEffect } from "react";
import axios from "axios";

import { Diary } from "./types";
import { getDiaries } from "./services/diaryService";
import ErrorMessage from "./components/errorMessage";
import DiaryForm from "./components/diaryForm";
import DiaryEntries from "./components/diaryEntries";


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getDiaries()
      .then(response => {setDiaries(response);})
      .catch(error => {
        if (axios.isAxiosError(error)) {
          showError(error.response?.data ? error.response?.data : error.message);
        } else {
          showError("An unexpected error occured with getDiaries()");
          console.log(error);
        }
      });
  }, []);

  const showError = (error: string) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(""), 10000);
  };

  const addToDiaries = (diary: Diary) => setDiaries(diaries.concat(diary));

  return (
    <>
    <h1>{"Flight diary app"}</h1>
    {errorMessage && <ErrorMessage message={errorMessage} />}
    <DiaryForm showError={showError} addToDiaries={addToDiaries}/>
    <DiaryEntries diaries={diaries} />
    </>
  );
}

export default App;
