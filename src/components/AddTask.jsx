import { useState, useRef } from "react";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function AddTask() {
    // input title controllato
    const [title, setTitle] = useState('');

    // textarea con useRef 
    const descriptionRef = useRef();

    // status con useRef 
    const statusRef = useRef();

    function handleForm(e) {
        e.preventDefault();
        if (!title) {
            console.error('Il campo non può essere vuoto!');
            return;
        }

        if ([...title].some(char => symbols.includes(char))) {
            console.error('Non può contenere simboli speciali!');
            return;
        }

        const description = descriptionRef.current.value;
        const status = statusRef.current.value;

        console.log({
            title,
            description,
            status
        })
    }

    return (<>
        <h2 className="task-list-title">Aggiungi una task!</h2>

        <form className="form-style" onSubmit={handleForm}>
            <input className="padding" type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Nome della task" />

            <textarea className="padding"
                ref={descriptionRef}
                placeholder="Aggiungi una descrizione..."></textarea>

            <select className="select-style" ref={statusRef}>
                <option value="">To do</option>
                <option value="to-do">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>
            <button className="btn-submit" type="submit">Aggiungi Task</button>
        </form>
    </>)
}

export default AddTask;