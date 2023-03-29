import UserType from "./UserType";

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export default UserContextType;