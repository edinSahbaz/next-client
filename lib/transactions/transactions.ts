import { UserTransaction } from "../types/UserTransaction";

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

export const readTransactions = async (userID: string) => {
    const transactions: Array<UserTransaction> = [];

    return transactions;
}