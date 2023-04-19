import { Timestamp, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

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

export const buyCourse = (usersID: string, course: 'python') => {
    const colRef = doc(db, courseURL(usersID, course));

    fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    setDoc(colRef, {
        paid: true,
        __paid_date: Timestamp.now()
    }, { merge: true })
}