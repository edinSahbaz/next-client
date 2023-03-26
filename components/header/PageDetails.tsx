import { Source_Code_Pro } from 'next/font/google'
import { TypeAnimation } from 'react-type-animation';
import { BtnType } from "@/lib/types/BtnType";
import RedButton from '../general/RedButton';
import Header from './Header';

interface DetailsProps {
    title: string;
    description: string;
    btn: BtnType | null;
    hasCode: boolean;
}

const sourceCodePro = Source_Code_Pro({
    weight: '400',
    subsets: ['latin'],
})

const Terminal = () => {
    const date = new Date();
    const codeLines = [
        "python",
        3000,
        `python 
        Python 3.9.7 (${date.toDateString()})
        >>> vi = motivisan_buduci_programer()
        >>>
        >>> print(vi.znate_programirati)
        False
        >>>
        >>> vi.upisi_kurs_programiranja()
        >>>
        >>> while vi.ucite_programirati():
        .... vi.koristite("nauciProgramiranje.ba")
        >>>
        >>> print(vi.znate_programirati)
        True
        >>> exit()`
    ]


    return (
        <div className={`${sourceCodePro.className} bg-[var(--bg-ter-editor)] w-[680px] h-[370px] py-1 px-2 border-white border-[1px] rounded-md shadow-md text-[var(--editor-txt-color)]`}> 
            <TypeAnimation
                sequence={codeLines}
                wrapper="span"
                cursor={true}
                deletionSpeed={0}
                speed={5}
                repeat={0}
                style={{ 
                    whiteSpace: 'pre-line', 
                    fontSize: '1em', 
                    display: 'inline-block', 
                }}
            />
        </div>
    );
}

const PageDetails = (props: DetailsProps) => {
    const { title, description, btn, hasCode } = props;

    return ( 
        <div className={`headerBg px-36 py-16 grid ${hasCode && "grid-cols-2"} place-items-center pt-36`}>
            <Header />
            <div className={`text-white flex flex-col gap-8 justify-center w-[540px] ${!hasCode && "items-center h-[320px]"}`}>
                <h1 className="text-4xl font-semibold">{title}</h1>
                <p className='text-lg'>{description}</p>

                {btn && <RedButton btnText={btn.btnText} btnIcon={btn.btnIcon} btnAction={btn.btnAction} />}
            </div>

            {hasCode && <Terminal />}
        </div> 
    );
}
 
export default PageDetails;