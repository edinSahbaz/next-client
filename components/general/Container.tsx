import { ReactNode } from "react";

const Container = ({ children } : { children: ReactNode }) => {
    return ( 
        <div className="px-[15%] py-12 flex flex-col items-center justify-center gap-8 text-[var(--p-txt-color)]">
            { children }
        </div>
     );
}
 
export default Container;