import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE and UPDATE
  function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    if (editId !== null) {
      setTasks(
        tasks.map((item) =>
          item.id === editId ? { ...item, text: task } : item,
        ),
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: task }]);
    }

    setTask("");
  }

  // DELETE
  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  // EDIT
  function editTask(item) {
    setTask(item.text);
    setEditId(item.id);
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>

              <div className="actions">
                <button type="button" onClick={() => editTask(item)}>
                  Edit
                </button>

                <button type="button" onClick={() => deleteTask(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
