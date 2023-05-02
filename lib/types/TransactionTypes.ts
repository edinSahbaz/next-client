import { Timestamp } from "firebase/firestore"

export type TransactionDataType = {
    paidAmount: number,
    __added_time: Timestamp
}

export type TransactionObjType = {
    id: string,
    data: TransactionDataType
}