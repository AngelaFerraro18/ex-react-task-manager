import ReactDOM from "react-dom";

function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {

    if (!show) return null;

    return ReactDOM.createPortal(<>
        <h2>{title}</h2>
        <div>{content}</div>

        <button onClick={onClose}>Annulla</button>
        <button onClick={onConfirm}>{confirmText}</button>
    </>,
        document.getElementById('modal-root')
    )
}

export default Modal;