import { useReducer, useEffect } from "react";
import axios from "axios";
import taskReducer from "../reducers/tasksReducer";

function useTasks() {

    const [tasks, dispatchTasks] = useReducer(taskReducer, []);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${url}/tasks`)
            .then(res => {
                console.log(res.data);
                dispatchTasks({ type: 'LOAD_TASKS', payload: res.data });
            })
            .catch(err => console.error(err));
    }, []);


    // funzione addTask 
    async function addTask({ title, description, status }) {
        console.log('Dati che sto inviando:', { title, description, status });

        const taskExists = tasks.some(t => t.title === title);

        if (taskExists) {
            throw new Error('Nome già esistente!')
        }
        try {
            const response = await axios.post(`${url}/tasks`, {
                title,
                description,
                status
            });

            const newTask = response.data.task;

            dispatchTasks({ type: 'ADD_TASK', payload: newTask });

            console.log(newTask);
            return { success: true, task: newTask }
        } catch (error) {
            console.error("Si è verificato un errore nella creazione della task", error);
            return { success: false, message: error.response?.data };
        }
    };

    // funzione removeTask

    async function removeTask(id) {
        try {
            await axios.delete(`${url}/tasks/${id}`);
            dispatchTasks({ type: 'REMOVE_TASK', payload: id })

            return { success: true }
        } catch (error) {
            console.error('Qualcosa è andato storto', error.response?.message);
            return { success: false, message: error.response?.message }
        }

    };


    //funzione rimozione più tasks

    async function removeMultipleTasks(taskIds) {
        const deleteReq = taskIds.map(taskId => axios.delete(`${url}/tasks/${taskId}`));
        const results = await Promise.allSettled(deleteReq);

        const fullfilledDeletions = [];
        const rejectedDeletions = [];

        results.forEach((result, index) => {
            const taskId = taskIds[index];

            if (result.status === 'fulfilled' && result.value.data.success) {
                fullfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            }

            console.log(result)
        })

        if (fullfilledDeletions.length > 0) {
            dispatchTasks({ type: 'REMOVE_MULTIPLE_TASKS', payload: fullfilledDeletions });
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nell'eliminazione delle task con id: ${rejectedDeletions.join(", ")}`);
        }
    }

    // funzione updateTask
    async function updateTask(updatedTask) {

        const taskSameTitle = tasks.find(t => t.title === updatedTask.title);

        if (taskSameTitle && taskSameTitle.id !== updatedTask.id) {
            throw new Error('Nome già esistente!')
        }

        try {
            console.log("Sto aggiornando la task:", updatedTask);

            const response = await axios.put(`${url}/tasks/${updatedTask.id}`, updatedTask);

            dispatchTasks({ type: 'UPDATE_TASKS', payload: response.data.task })

            console.log(response.data.task.id);
            console.log(response.data)
            return { success: true, task: response.data };
        } catch (error) {
            console.error('Qualcosa è andato storto', error.response?.data?.message);
            return { success: false, message: error.response?.data?.message }
        }
    };


    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

export default useTasks;