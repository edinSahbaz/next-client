import { Timestamp, collection, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const courseURL = (usersID: string, course: 'python') => {
    return `users/${usersID}/courses/${course}`
}

export const buyCourse = (usersID: string, course: 'python') => {
    const colRef = doc(db, courseURL(usersID, course));

    setDoc(colRef, {
        paid: true,
        __paid_date: Timestamp.now()
    }, { merge: true })
}