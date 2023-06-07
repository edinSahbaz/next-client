import { UserTransaction } from "../types/UserTransaction";
import { Dispatch, SetStateAction } from "react";

export const transactionsURL = (usersID: string) => {
    return `users/${usersID}/transactions`
}

export const addTransaction = async (userID: string, amount: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userID,
                amount: amount
            }),
        });
    
        const transactionRes = await response.json();
        return transactionRes;
    } catch (error) {
        console.log(error);
    }
}

export const readTransactions = async (userID: string, setFunction: Dispatch<SetStateAction<Array<UserTransaction>>>) => {
    const transactions: Array<UserTransaction> = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/user=${userID}`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const resData = await response.json();

        const modifiedData = resData.map((x: UserTransaction) => {
            return {
                ...x,
                addedDate: new Date(x.addedDate)
            }
        })

        setFunction(modifiedData);
        return resData;
    } catch (error) {
        console.log(error);
    }

    return transactions;
}

export const getLatestTransaction = async (userID: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/user=${userID}/getLatest`, {
            method: 'GET',
            mode: 'cors'
        });
    
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
}