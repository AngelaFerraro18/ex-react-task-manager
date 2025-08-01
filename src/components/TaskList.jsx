// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { useGlobalContext } from "../context/GlobalContext";
import { useCallback, useMemo, useRef, useState } from "react";

function TaskList() {

    const { tasks, removeMultipleTasks } = useGlobalContext();

    //variabili di stato per ordinamento
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    //variabile di stato per la ricerca
    const [searchQuery, setSearchQuery] = useState('');
    const debounceRef = useRef();

    //variabile di stato per checkbox
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    function toggleSelection(taskId) {
        if (selectedTaskIds.includes(taskId)) {
            setSelectedTaskIds(prev => prev.filter(id => id !== taskId));
        } else {
            setSelectedTaskIds(prev => [...prev, taskId]);
        }
    }


    const handleSearch = useCallback((e) => {
        const value = e.target.value;

        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setSearchQuery(value);
        }, 300)
    }, [])


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

        const filteredTasks = [...tasks].filter(t => t && t.title && t.title.toLowerCase().includes(searchQuery.toLowerCase()));

        console.log('tasks', tasks)

        return filteredTasks.sort((a, b) => {
            let result = 0;

            if (sortBy === 'title') {
                result = a.title.localeCompare(b.title);
            } else if (sortBy === 'status') {
                result = statusOrder[a.status] - statusOrder[b.status];
            } else if (sortBy === 'createdAt') {
                result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return result * sortOrder;
        })

    }, [tasks, sortBy, sortOrder, searchQuery]);


    async function handleDeleteMultiple() {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert('Task eliminate con successo!');
            setSelectedTaskIds([]);
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }

    return (<>
        <h2 className="task-list-title">Lista delle task:</h2>

        <div>
            <input type="text"
                placeholder="Cerca per nome..."
                onChange={handleSearch} />

            {selectedTaskIds.length > 0 && (
                <button onClick={handleDeleteMultiple}>Elimina selezionate</button>
            )}

            <div className="header-table">
                <div onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}><strong>Nome</strong></div>
                <div onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}><strong>Stato</strong></div>
                <div onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}><strong>Data di creazione</strong></div>
            </div>
            <div className="body-table">
                {sortedTasks.map(t =>
                    <TaskRow key={t.id}
                        task={t}
                        checked={selectedTaskIds.includes(t.id)}
                        onToggle={toggleSelection} />
                )}
            </div>

        </div>

    </>)
}

export default TaskList;