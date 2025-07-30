import { useState, useRef, useContext } from "react";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";
// import useTasks from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function AddTask() {
    // input title controllato
    const [title, setTitle] = useState('');

    // textarea con useRef 
    const descriptionRef = useRef();

    // status con useRef 
    const statusRef = useRef();

    //importo la funzione addTask()
    const { addTask } = useGlobalContext();

    const navigate = useNavigate();

    async function handleForm(e) {
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
        const status = statusRef.current.value.trim();

        console.log({
            title,
            description,
            status
        })

        const res = await addTask({ title, description, status });

        if (res.success) {
            alert('Task aggiunta con successo!');
            setTitle('');
            descriptionRef.current.value = '';
            statusRef.current.value = '';
            navigate('/');
        } else {
            alert("C'è stato un errore nell'aggiunta della task!", res.message)
        }

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

            <select className="select-style" ref={statusRef} defaultValue={"To do"}>
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
            <button className="btn-submit" type="submit">Aggiungi Task</button>
        </form>
    </>)
}

export default AddTask;