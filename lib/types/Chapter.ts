import { Guid } from "./Guid";

export type Chapter = {
    id: Guid;
    title: string;
    description: string;
    chapterNumber: number;
    durationInHrs: number;
    lessonsNumber: number;
    tasksNumber: number;
}