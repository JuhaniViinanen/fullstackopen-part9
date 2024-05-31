import { useState } from "react";
import axios from "axios";

import { Diary } from "../types";
import { createDiary } from "../services/diaryService";


const DiaryForm = (
    {
        showError,
        addToDiaries, } :
    {
        showError: (message: string) => void,
        addToDiaries: (diary: Diary) => void,
    }) => {
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [weather, setWeather] = useState("sunny");
    const [visibility, setVisibility] = useState("great");
    const [comment, setComment] = useState("");

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        createDiary({date, weather, visibility, comment})
          .then(res => {
            addToDiaries(res);
            setComment("");
          })
          .catch(error => {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data ? error.response?.data : error.message);
            } else {
                showError("An unexpected error occured with createDiary()");
                console.log(error);
            }
          });
    };

    const weathers = ["sunny", "rainy", "clody", "stormy", "windy"];
    const visibilities = ["great", "good", "ok", "poor"];

    return (
        <div>
        <h2>{"Add new diary entry"}</h2>
        <form onSubmit={submitForm}>
            <div>
                <label>
                    {"Date: "}
                    <input
                      type="date"
                      value={date}
                      onChange={({target}) => setDate(target.value)}
                    />
                </label>
            </div>
            <div>
                <fieldset style={{ display: "inline-block" }}>
                    <legend>{"Weather: "}</legend>
                    {weathers.map(w => 
                        <label key={w}>
                            {w}
                            <input
                              type="radio"
                              name="weather"
                              value={w}
                              checked={weather === w}
                              onChange={({target}) => setWeather(target.value)}
                            />
                        </label>
                    )}
                </fieldset>
            </div>
            <div>
                <fieldset style={{ display: "inline-block" }}>
                    <legend>{"Visibility"}</legend>
                    {visibilities.map(v => 
                        <label key={v}>
                            {v}
                            <input
                              type="radio"
                              name="visibility"
                              value={v}
                              checked={visibility === v}
                              onChange={({target}) => setVisibility(target.value)}
                            />
                        </label>
                    )}
                </fieldset>
            </div>
            <div>
                <label>
                    {"Comment: "}
                    <input value={comment} onChange={({target}) => setComment(target.value)} />
                </label>
            </div>
            <div>
                <button type="submit">{"Add"}</button>
            </div>
        </form>
        </div>
    );
};

export default DiaryForm;