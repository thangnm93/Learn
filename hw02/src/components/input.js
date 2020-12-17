export default function InputBox(props) {
    const {name, value, placeHolder, onChange} = props;
    return (
        <input
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
        />
    );
}