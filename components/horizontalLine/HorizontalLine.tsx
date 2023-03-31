interface HorizontalLineProps {
    color?: string;
    width?: string;
    height?: string;
}

const HorizontalLine = (props: HorizontalLineProps) => {
    let { color, width, height } = props;

    if(!color) color = "#000";
    if(!width) color = "100%";
    if(!height) height = "h-[1px]";
    
    return ( 
        <div className={`${width} w-full ${color} ${height} shadow-md`}></div>
     );
}
 
export default HorizontalLine;