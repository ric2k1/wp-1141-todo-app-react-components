const AddTodo = ({ 
  newTodo, 
  setNewTodo, 
  description, 
  setDescription, 
  onAddTodo 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddTodo()
    }
  }

  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onAddTodo()
    }
  }

  return (
    <div className="add-todo-section">
      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="new todo"
          className="todo-input"
        />
        <button onClick={onAddTodo} className="add-btn">add</button>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleDescriptionKeyDown}
        placeholder="description"
        className="description-input"
      />
    </div>
  )
}

export default AddTodo
