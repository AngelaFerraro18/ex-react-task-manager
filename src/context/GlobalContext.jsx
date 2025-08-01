import { useContext, createContext } from "react";
import useTasks from "../hooks/useTasks";

// salvo in una variabile createContext();
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const { tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}


function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext deve essere usato all'interno di GlobalProvider");
    }
    return context;
}
export { GlobalProvider, useGlobalContext };