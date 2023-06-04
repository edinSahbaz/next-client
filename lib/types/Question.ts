import { Guid } from "./Guid"

export type Question = {
    id: Guid;
    lessonId: Guid;
    prompt: string;
    answer: string;
    questionNumber: number;
    isCodeQuestion: boolean;
    possibleAnswers: string;
}