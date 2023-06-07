const Tab = (props: { tab: string, first: boolean, last: boolean, setActiveTab: (tab: string) => void }) => {
    const { tab, first, last, setActiveTab } = props;
    
    return (
        <div onClick={() => setActiveTab(tab)}
            className={`bg-[var(--editor-bg)] w-fit px-6 h-full cursor-pointer shadow-md grid place-items-center ${first && "rounded-tl-md"} ${last && "rounded-tr-md"}`}>
            <p>{tab}</p>
        </div>
    );
}

export default Tab;