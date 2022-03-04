import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from './components/Footer'
import About from './components/About'

const App = () => {

  const [showAddTask, setShowAddTask] = useState(true)

  const [tasks, setTasks] = useState([])

  const host = 'http://localhost:5000/'

  useEffect(() => {

    const getTasks = async () => {
      const serverTasks = await fetchTasks()
      setTasks(serverTasks)
    }
    getTasks()
  }, [])

  //Fetch Tasks from API
  const fetchTasks = async () => {
    const res = await fetch(host + 'tasks')
    const data = await res.json()

    return data
  }
  //Fetch Task from API
  const fetchTask = async (id) => {
    const res = await fetch(host + `tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {

    const res = await fetch(host + 'tasks',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(task)
      }
    )

    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(host + `tasks/${id}`,
      {
        method: 'DELETE'
      })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateReminder = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(host + `tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateReminder)
      })

    const newReminder = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !newReminder.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header showAdd={() => setShowAddTask(!showAddTask)} />

        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}

              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
                : ("There are no tasks to show")}

            </>
          }
          />

          <Route path='/about' element={<About />} />

        </Routes>
        <Footer />

      </div>
    </Router>

  );
}

export default App;
