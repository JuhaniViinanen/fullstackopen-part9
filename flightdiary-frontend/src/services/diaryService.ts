import axios from "axios";
import { Diary, newDiary } from "../types";

const BASEURL = "http://localhost:3000/api/diaries";

export const getDiaries = () => {
    return axios
      .get<Diary[]>(BASEURL)
      .then(res => res.data);
};

export const createDiary = (diary: newDiary) => {
    return axios
      .post<Diary>(BASEURL, diary)
      .then(res => res.data);
};