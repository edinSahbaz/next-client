import { Guid } from "./Guid";

export type Lesson = {
    id: Guid;
    chapterId?: Guid;
    title: string;
    description?: string;
    lessonNumber?: number;
    videoUrl?: string;
}