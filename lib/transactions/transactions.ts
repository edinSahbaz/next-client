import { Timestamp, addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { TransactionDataType, TransactionObjType } from "../types/TransactionTypes";

export const transactionsURL = (usersID: string) => {
    return `users/${usersID}/transactions`
}

export const addTransaction = async (usersID: string, transaction: TransactionDataType) => {
    const colRef = collection(db, transactionsURL(usersID));

    return addDoc(colRef, transaction);
}

export const readTransactions = async (usersID: string) => {
    const colRef = collection(db, transactionsURL(usersID));
    const q = query(colRef, orderBy('__added_time', 'desc'));

    const data = await getDocs(q);

    const transactions: Array<TransactionObjType> = [];

    data.forEach((doc) => {
        const objToPush: TransactionObjType = {
            id: doc.id,
            data: {
                __added_time: doc.data()?.__added_time,
                paidAmount: doc.data()?.paidAmount,
            }
        }

        transactions.push(objToPush);
    });

    return transactions;
}