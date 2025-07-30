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
            })
            return { success: true, task: response.data }
        } catch (error) {
            console.error("Si è verificato un errore nella creazione della task", error);
            return { success: false, message: error.response?.data };
        }
    };

    // funzione removeTask

    function removeTask() {

        return
    };

    // funzione updateTask
    function updateTask() {
        return
    };


    return { tasks, setTasks, addTask };
}

export default useTasks;