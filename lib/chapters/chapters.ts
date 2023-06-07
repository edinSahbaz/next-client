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
    
            const lessonsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/chapter=${chapter.id.value}`, {
                method: 'GET',
                mode: 'cors'
            });
    
            const lessons = await lessonsRes.json();

            let tasksNumber = 0;
            for (let j in lessons) {
                const lesson = lessons[j];
                
                const tasksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/lesson=${lesson.id.value}`, {
                    method: 'GET',
                    mode: 'cors'
                });
            
                const tasks = await tasksRes.json();

                tasksNumber += tasks.length;
            }

            chaptersRes[i].lessonsNumber = lessons.length;
            chaptersRes[i].tasksNumber = tasksNumber;
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
