export default function capitalizeFirstLetter(text: string) {
    const newStr: string = String(text);
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}