import { Dispatch, SetStateAction } from "react";
import { Lesson } from "../types/Lesson";

export const getLessons = async (chapterId: string, setFunction: Dispatch<SetStateAction<Lesson[] | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/chapter=${chapterId}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const lessonsRes = await response.json();

        for (let i in lessonsRes) {
            const lesson: Lesson = lessonsRes[i];

            const questions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/lesson=${lesson.id.value}`, {
                method: 'GET',
                mode: 'cors'
            });

            const questionsRes = await questions.json();
            console.log(questionsRes)

            lessonsRes[i].questionsNumber = questionsRes.length;
        }

        console.log(lessonsRes)
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