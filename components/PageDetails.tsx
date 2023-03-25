import Link from "next/link";
import { ReactNode } from "react";

interface DetailsProps {
    title: string;
    description: string;
    btnText: string;
    btnIcon: ReactNode;
    btnAction: string;
    hasCode: boolean;
}

const PageDetails = (props: DetailsProps) => {
    const { title, description, btnText, btnIcon, btnAction, hasCode } = props;

    return ( 
        <div>
            <h1>{title}</h1>
            <p>{description}</p>

            <Link href={btnAction}>
                {btnIcon}
                {btnText}
            </Link>
        </div> 
    );
}
 
export default PageDetails;