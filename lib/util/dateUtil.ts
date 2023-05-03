import { differenceInCalendarDays } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const getDifferenceInDaysFromToday = (paidDateTimestamp: Timestamp) => {
    const currentDate = new Date();
    const paidDate = paidDateTimestamp.toDate();
    const expireDate = new Date(paidDate.getFullYear() + 1, paidDate.getMonth(), paidDate.getDate());

    const remainingTime = differenceInCalendarDays(expireDate, currentDate);

    return remainingTime;
}