import { createContext } from "react";

type StripeContextType = {
    clientSecret: string | null,
}

const StripeContext = createContext<StripeContextType>({
    clientSecret: null,
});

export default StripeContext;