import { Dispatch, SetStateAction } from "react";
import { Question } from "../types/Question";

export const getQuestions = async (lessonId: string, setFunction: Dispatch<SetStateAction<Question[] | undefined>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/lesson=${lessonId}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const questionsRes = await response.json();
        setFunction(questionsRes);
    } catch (error) {
        console.log(error);
    }
}