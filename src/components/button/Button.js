import './button.css'

function Button(props) {
    const { page, title, onClick, active } = props;

    return (
        <div
            className={`headerBut ${active ? 'active' : ''}`}
            onClick={() => onClick(page)}
        >{title}</div>
    );
}

export default Button