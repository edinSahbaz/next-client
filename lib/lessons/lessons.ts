import { Dispatch, SetStateAction } from "react";
import { Lesson } from "../types/Lesson";

export const getLessons = async (chapterId: string, setFunction: Dispatch<SetStateAction<Lesson[] | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/chapter=${chapterId}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const lessonsRes = await response.json();
        setFunction(lessonsRes);
    } catch (error) {
        console.log(error);
    }
}

export const getLessonById = async (lessonId: string, setFunction: Dispatch<SetStateAction<Lesson | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lessonId}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const lessonRes = await response.json();
        setFunction(lessonRes);
    } catch (error) {
        console.log(error);
    }
}