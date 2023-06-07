import { Timestamp } from "firebase/firestore";

type UserType = {
    uid: string,
    email: string | null,
    displayName: string | null,
    isCoursePaid: boolean | null,
    coursePaidDate: Date | null,
    remainingDays: number | null,
}

export default UserType;