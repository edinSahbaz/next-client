import { ReactNode } from "react";

export type HeaderProps = {
    tabs: string[];
    btn?: {
        content: ReactNode | string,
        bg: string,
        bg_hover: string,
        action: () => void,
    };
}