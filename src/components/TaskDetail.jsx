import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
// import useTasks from "../hooks/useTasks";
import Modal from "./Modal";
import EditTaskModal from "./EditTaskModal";
import dayjs from "dayjs";

function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useGlobalContext();

    const navigate = useNavigate();

    //imposto una variabile di stato per la gestione della modale
    const [modal, setModal] = useState(false);

    //imposto la variabile per la modale della modifica
    const [updateModal, setUpdateModal] = useState(false);

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
        <p>{dayjs(task.createdAt).format('DD/MM/YYYY')}</p>

        <button onClick={() => setModal(true)}>Elimina task</button>

        <button onClick={() => {
            setUpdateModal(true);
            console.log('ho cliccato')
        }}>Modifica Task</button>

        <Modal
            title="Conferma l'eliminazione"
            content="Sei sicuro di voler cancellare questa task?"
            show={modal}
            onClose={() => setModal(false)}
            onConfirm={deleteTask}
            confirmText="Elimina"
        />


        <EditTaskModal
            show={updateModal}
            onClose={() => setUpdateModal(false)}
            task={task}
            onSave={async (updatedTask) => {
                const response = await updateTask(updatedTask);


                if (response.success) {
                    alert('Task modificata con successo!');
                    setUpdateModal(false);
                } else {
                    alert('Errore nella modifica della task', response.message)
                }
            }}
        />
    </>)
}


export default TaskDetail;