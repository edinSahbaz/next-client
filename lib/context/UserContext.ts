import { createContext } from "react";
import UserContextType from "../types/UserContextType";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    setLoading: () => {},
});

export default UserContext;