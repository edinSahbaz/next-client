import { Guid } from "./Guid"

export type UserTransaction = {
    id: Guid,
    paidAmount: number,
    addedTime: Date
}