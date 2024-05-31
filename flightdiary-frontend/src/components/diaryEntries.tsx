import { Diary } from "../types";

const DiaryEntries = ({ diaries } : { diaries: Diary[] }) => {
    return (
        <div>
            <h2>{"Diary entries"}</h2>
            {diaries.map(diary => 
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <ul style={{ listStyle: "none" }}>
                        <li>{`Weather: ${diary.weather}`}</li>
                        <li>{`Visibility: ${diary.visibility}`}</li>
                        {diary.comment && <li>{`Comment: ${diary.comment}`}</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DiaryEntries;