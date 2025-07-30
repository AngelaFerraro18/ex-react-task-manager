import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return <p>Task non trovata!</p>
    }

    return (<>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.status}</p>
        <p>{new Date(task.createdAt).toLocaleDateString()}</p>

        <button onClick={() => { console.log('Elimino la task') }}>Elimina task</button>
    </>)
}


export default TaskDetail;