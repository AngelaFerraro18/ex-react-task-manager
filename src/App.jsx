import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"

function App() {


  return (
    <>
      <BrowserRouter>
        <NavLink to="/add-task">Aggiungi task</NavLink>
        <NavLink to="/">Lista delle task</NavLink>
        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
