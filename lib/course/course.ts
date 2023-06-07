import { getLatestTransaction } from "../transactions/transactions"
import { UserTransaction } from "../types/UserTransaction";
import { getDifferenceInDaysFromToday } from "../util/dateUtil";

export const courseURL = (usersID: string, course: 'python') => {
    return `users/${usersID}/courses/${course}`
}

export const isCoursePaid = async (userID: string) => {
    const resData: UserTransaction = await getLatestTransaction(userID);

    const addedDate = resData?.addedDate && new Date(resData.addedDate);
            
    const diff = addedDate && getDifferenceInDaysFromToday(addedDate);
    const isPaid = diff ? diff > 0 : false;

    return {
        isPaid,
        addedDate,
        diff
    };
}