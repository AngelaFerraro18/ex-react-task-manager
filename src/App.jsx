import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"
import { GlobalProvider } from "./context/GlobalContext"
import TaskDetail from "./components/TaskDetail"

function App() {


  return (
    <>
      <NavLink className="navlink" to="/add-task">Aggiungi task</NavLink>
      <NavLink className="navlink" to="/">Lista delle task</NavLink>
      <Routes>
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </>
  )
}

export default App
