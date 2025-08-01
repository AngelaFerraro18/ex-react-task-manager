import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {

    // input title controllato
    const [title, setTitle] = useState('');

    //textarea controllata
    const [description, setDescription] = useState('');

    //select controllata
    const [select, setSelect] = useState('To do');

    // form non controllato
    const formRef = useRef();

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setSelect(task.status || 'To do')
        }
    }, [task]);

    function handleSubmit(e) {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title,
            description,
            status: select
        };

        onSave(updatedTask);
    };

    function handleConfirmClick() {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    const formContent = <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titolo"
        />

        <textarea placeholder="Descrizione"
            value={description}
            onChange={e => setDescription(e.target.value)}>
        </textarea>

        <select value={select}
            onChange={e => setSelect(e.target.value)}
        >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
    </form>

    return (<Modal title='Modifica Task'
        confirmText='Salva'
        onConfirm={handleConfirmClick}
        onClose={onClose}
        content={formContent}
        show={show}
    />)
}

export default EditTaskModal;