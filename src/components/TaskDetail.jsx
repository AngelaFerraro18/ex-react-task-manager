import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import useTasks from "../hooks/useTasks";

function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    //importo la funzione removeTask
    const { removeTask } = useTasks();
    const navigate = useNavigate();

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

        <button onClick={deleteTask}>Elimina task</button>
    </>)
}


export default TaskDetail;