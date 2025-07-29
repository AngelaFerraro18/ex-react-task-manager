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

    return [tasks, setTasks];

    // funzione addTask 
    function addTask() {
        return
    };

    // funzione removeTask

    function removeTask() {
        return
    };

    // funzione updateTask
    function updateTask() {
        return
    };
}

export default useTasks;