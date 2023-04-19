import { Timestamp } from "firebase/firestore";

type UserType = {
    uid: string,
    email: string | null,
    displayName: string | null,
    isCoursePaid: boolean | null,
    coursePaidDate: Timestamp | null,
}

export default UserType;