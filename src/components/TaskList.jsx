// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { useGlobalContext } from "../context/GlobalContext";
import { useMemo, useState } from "react";

function TaskList() {

    const { tasks } = useGlobalContext();

    //variabili di stato per ordinamento
    const [sortBy, setSortBy] = useState('CreatedAt');
    const [sortOrder, setSortOrder] = useState(1);


    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder(prev => -prev);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    }

    const sortedTasks = useMemo(() => {

        const statusOrder = { 'To do': 0, 'Doing': 1, 'Done': 2 };

        return [...tasks].sort((a, b) => {
            let result = 0;

            if (sortBy === 'title') {
                result = a.title.localeCompare(b.title);
            } else if (sortBy === 'status') {
                result = statusOrder[a.status] - statusOrder[b.status];
            } else if (sortBy === 'createAt') {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return result * sortOrder;
        })

    }, [tasks, sortBy, sortOrder]);

    return (<>
        <h2 className="task-list-title">Lista delle task:</h2>
        <div>
            <div className="header-table">
                <div onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}><strong>Nome</strong></div>
                <div onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}><strong>Stato</strong></div>
                <div onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}><strong>Data di creazione</strong></div>
            </div>
            <div className="body-table">
                {sortedTasks.map(t =>
                    <TaskRow key={t.id} task={t} />
                )}
            </div>

        </div>

    </>)
}

export default TaskList;