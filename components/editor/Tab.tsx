const Tab = (props: { tab: string, first: boolean, last: boolean }) => {
    const { tab, first, last } = props;
    
    return (
        <div className={`bg-[var(--editor-bg)] w-fit px-6 h-full cursor-pointer shadow-md grid place-items-center ${first && "rounded-tl-md"} ${last && "rounded-tr-md"}`}>
            <p>{tab}</p>
        </div>
    );
}

export default Tab;