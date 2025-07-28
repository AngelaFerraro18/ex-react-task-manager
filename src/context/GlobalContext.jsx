import { createContext, useEffect, useState } from "react";
import axios from "axios";

// salvo in una variabile createContext();
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const [tasks, setTasks] = useState([]);
    const url = import.meta.env.VITE_API_URL;
    console.log('riga 11', url);

    useEffect(() => {
        axios.get(`${url}/tasks`)
            .then(res => {
                console.log(res.data);
                setTasks(res.data);
            })
            .catch(err => console.error(err));
    }, [])

    return (<>
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    </>)
}

export { GlobalProvider, GlobalContext };