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

export const buyCourse = async (userID: string, course: 'python') => {
    const colRef = doc(db, courseURL(userID, course));

    fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    await addTransaction(userID, {
        __added_time: Timestamp.now(),
        paidAmount: 99
    })

    setDoc(colRef, {
        paid: true,
        __paid_date: Timestamp.now()
    }, { merge: true })
}