import { Timestamp, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { addTransaction } from "../transactions/transactions"

export const courseURL = (usersID: string, course: 'python') => {
    return `users/${usersID}/courses/${course}`
}

export const isCoursePaid = async (usersID: string, course: 'python') => {
    const docRef = doc(db, courseURL(usersID, course));

    const docData = await getDoc(docRef);

    if(!docData.exists()) 
    return {
        isPaid: false,
        paidDate: null,
    };

    return {
        isPaid: docData.data()?.paid,
        paidDate: docData.data()?.__paid_date,
    };
}

export const buyCourse = async (userID: string, paymentId: string) => {
    console.log(userID, paymentId);
}