import { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerTareas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", config);
      setTasks(res.data);
    } catch (err) {
      console.error("Error al obtener tareas", err);
    }
  };

  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return;
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title: nuevaTarea },
        config
      );
      setNuevaTarea("");
      obtenerTareas();
    } catch (err) {
      console.error("Error al agregar tarea", err);
    }
  };

  const cambiarEstado = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        config
      );
      obtenerTareas();
    } catch (err) {
      console.error("Error al actualizar tarea", err);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      obtenerTareas();
    } catch (err) {
      console.error("Error al eliminar tarea", err);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className="task-container">
      <h2>Mis Tareas</h2>

      <div className="form-nueva-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul className="lista-tareas">
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => cambiarEstado(t.id, t.completed)}
              className={t.completed ? "completada" : ""}
            >
              {t.completed ? "✅ " : ""}
              {t.title}
            </span>

            <button
              onClick={() => eliminarTarea(t.id)}
              className="btn-eliminar"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
