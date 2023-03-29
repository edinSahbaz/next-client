interface HorizontalLineProps {
    color?: string;
    width?: string;
}

const HorizontalLine = (props: HorizontalLineProps) => {
    let { color, width } = props;

    if(!color) color = "#000";
    if(!width) color = "100%";
    
    return ( 
        <div className={`${width} w-full ${color} h-[1px]`}></div>
     );
}
 
export default HorizontalLine;