import { ReactNode } from "react";

export type BtnType = {
    btnText: string;
    btnIcon: ReactNode | null;
    btnAction: string;
    reversed?: boolean;
    animated?: boolean;
}