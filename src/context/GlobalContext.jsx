import { createContext } from "react";
import useTasks from "../hooks/useTasks";

// salvo in una variabile createContext();
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const { tasks, setTasks, addTask } = useTasks();

    return (<>
        <GlobalContext.Provider value={{ tasks, setTasks, addTask }}>
            {children}
        </GlobalContext.Provider>
    </>)
}

export { GlobalProvider, GlobalContext };