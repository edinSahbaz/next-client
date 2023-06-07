import { addYears, differenceInCalendarDays } from "date-fns";

export const getDifferenceInDaysFromToday = (paidDate: Date) => {
    const currentDate = new Date();
    const expireDate = addYears(paidDate, 1);

    const remainingTime = differenceInCalendarDays(expireDate, currentDate);

    return remainingTime;
}