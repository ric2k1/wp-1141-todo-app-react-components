import { useState } from 'react'
import './App.css'

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleDescriptionKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addTodo()
    }
  }

  return (
    <div className="container">
      <h1 className="title">todo list</h1>

      <div className="add-todo-section">
        <div className="input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="new todo"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">add</button>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleDescriptionKeyPress}
          placeholder="description"
          className="description-input"
        />
      </div>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={todo.id}>
            <div 
              className="todo-item"
              onClick={(e) => {
                if (e.target.type !== 'checkbox' && !e.target.classList.contains('delete-btn')) {
                  toggleDescription(todo.id)
                }
              }}
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTodo(todo.id)
                }}
              >
                delete
              </button>
            </div>
            {todo.expanded && (
              <div className="todo-description show">
                {todo.description}
              </div>
            )}
            {index < todos.length - 1 && <div className="separator" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App