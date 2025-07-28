import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";

function TaskList() {

    const { tasks } = useContext(GlobalContext);

    return (<>
        <h2 className="task-list-title">Lista delle task:</h2>
        <div>
            <div className="header-table">
                <div><strong>Nome</strong></div>
                <div><strong>Stato</strong></div>
                <div><strong>Data di creazione</strong></div>
            </div>
            <div className="body-table">
                {tasks && tasks.map(t =>
                    <TaskRow key={t.id} task={t} />
                )}
            </div>

        </div>

    </>)
}

export default TaskList;