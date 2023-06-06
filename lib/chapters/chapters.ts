import { Dispatch, SetStateAction } from "react";
import { Chapter } from "../types/Chapter";

export const getChapters = async (setFunction: Dispatch<SetStateAction<Chapter[] | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chapters`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const chaptersRes = await response.json();
    
        for (let i in chaptersRes) {
            const chapter = chaptersRes[i];
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/chapter=${chapter.id.value}`, {
                method: 'GET',
                mode: 'cors'
            });
    
            const lessons = await res.json();
    
            chaptersRes[i].lessonsNumber = lessons.length;
            chaptersRes[i].tasksNumber = lessons.length;
        }

        setFunction(chaptersRes);
    } catch (error) {
        console.log(error);
    }
}

export const getChapterById = async (chapterId: string, setFunction: Dispatch<SetStateAction<Chapter | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chapters/${chapterId}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const chapterRes = await response.json();
        setFunction(chapterRes);
    } catch (error) {
        console.log(error);
    }
}
