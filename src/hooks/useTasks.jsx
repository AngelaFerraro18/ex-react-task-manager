import { useState, useEffect } from "react";
import axios from "axios";

function useTasks() {

    const [tasks, setTasks] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${url}/tasks`)
            .then(res => {
                console.log(res.data);
                setTasks(res.data);
            })
            .catch(err => console.error(err));
    }, []);


    // funzione addTask 
    async function addTask({ title, description, status }) {
        console.log('Dati che sto inviando:', { title, description, status })
        try {
            const response = await axios.post(`${url}/tasks`, {
                title,
                description,
                status
            });

            const newTask = response.data;

            setTasks(prev => [...prev, newTask]);
            console.log(response);
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
            setTasks(prev => prev.filter(t => t.id !== id))
            return { success: true }
        } catch (error) {
            console.error('Qualcosa è andato storto', error.response?.message);
            return { success: false, message: error.response?.message }
        }

    };

    // funzione updateTask
    function updateTask() {
        return
    };


    return { tasks, setTasks, addTask, removeTask };
}

export default useTasks;