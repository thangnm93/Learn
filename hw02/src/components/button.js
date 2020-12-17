export default function Button(props) {
    const {className, buttonTxt, onClick} = props;
    return (
        <button className={className} onClick={onClick}>{buttonTxt}</button>
    );
}