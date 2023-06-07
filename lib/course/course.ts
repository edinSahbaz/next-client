export const courseURL = (usersID: string, course: 'python') => {
    return `users/${usersID}/courses/${course}`
}

export const isCoursePaid = async (userID: string) => {
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