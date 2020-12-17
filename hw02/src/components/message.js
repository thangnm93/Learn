export default function Message(props) {
    const {className, messageTxt} = props;
    return (
        messageTxt ? <p className={className}>{messageTxt}</p> : ''
    );
}