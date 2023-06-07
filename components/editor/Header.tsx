import { HeaderProps } from "@/lib/types/HeaderProps";
import Tab from "./Tab";

const Header = (props: HeaderProps) => {
    const { tabs, btn, setActiveTab } = props;

    const empty = () => {};

    return (
        <div className="bg-[var(--bg-sec-editor)] w-full h-10 flex justify-between shadow-md rounded-t-md">
            <div className="h-full flex">
            { tabs.map((tab, index) => (
                <Tab 
                    key={index} 
                    tab={tab} 
                    setActiveTab={setActiveTab || empty}
                    first={index === 0} 
                    last={index === tabs.length - 1} />
            ))}
            </div>

            {
                btn && (
                    <div onClick={btn.action} className={`${btn.bg} ${btn.bg_hover} transition-all duration-300 cursor-pointer px-6 grid place-items-center rounded-tr-md`}>
                        {btn.content}
                    </div>
                )
            }
        </div>
    );
}

export default Header;