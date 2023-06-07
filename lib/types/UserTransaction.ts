import { Guid } from "./Guid"

export type UserTransaction = {
    id: Guid,
    amount: number,
    addedDate: Date
}