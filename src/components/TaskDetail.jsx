import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
// import useTasks from "../hooks/useTasks";
import Modal from "./Modal";

function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask } = useGlobalContext();

    const navigate = useNavigate();

    //imposto una variabile di stato per la gestione della modale
    const [modal, setModal] = useState(false);

    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return <p>Task non trovata!</p>
    }

    async function deleteTask() {
        const response = await removeTask(task.id);

        if (response.success) {
            alert('Task eliminata con successo!');
            navigate('/');
        } else {
            alert('Non è stato possibile cancellare la task', response.message)
        }
    }

    return (<>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.status}</p>
        <p>{new Date(task.createdAt).toLocaleDateString()}</p>

        <button onClick={() => setModal(true)}>Elimina task</button>

        <Modal
            title="Conferma l'eliminazione"
            content="Sei sicuro di voler cancellare questa task?"
            show={modal}
            onClose={() => setModal(false)}
            onConfirm={deleteTask}
            confirmText="Elimina"
        />
    </>)
}


export default TaskDetail;