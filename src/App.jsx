import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "todo 1", description: "This is the description for todo 1", completed: false, expanded: false },
    { id: 2, text: "todo 2", description: "This is the description for todo 2", completed: false, expanded: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  const [description, setDescription] = useState('')
  const [nextId, setNextId] = useState(3)

  const addTodo = () => {
    const text = newTodo.trim()
    const desc = description.trim()
    
    if (!text) return
    
    const newTodoItem = {
      id: nextId,
      text: text,
      description: desc || "No description provided",
      completed: false,
      expanded: false
    }
    
    setTodos([...todos, newTodoItem])
    setNextId(nextId + 1)
    setNewTodo('')
    setDescription('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const toggleDescription = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
    ))
  }


  return (
    <div className="container">
      <h1 className="title">todo list</h1>

      <AddTodo
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        description={description}
        setDescription={setDescription}
        onAddTodo={addTodo}
      />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onToggleDescription={toggleDescription}
      />
    </div>
  )
}

export default App