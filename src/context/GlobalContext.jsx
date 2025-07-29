import { createContext } from "react";
import useTasks from "../hooks/useTasks";

// salvo in una variabile createContext();
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const [tasks, setTasks] = useTasks();

    return (<>
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    </>)
}

export { GlobalProvider, GlobalContext };