interface HorizontalLineProps {
    color?: string;
    width?: string;
    height?: string;
}

const HorizontalLine = (props: HorizontalLineProps) => {
    let { color, width, height } = props;

    if(!color) color = "bg-[#e3e3e3]";
    if(!width) width = "w-full";
    if(!height) height = "h-[1px]";
    
    return ( 
        <div className={`${width} ${color} ${height} shadow-md`}></div>
     );
}
 
export default HorizontalLine;