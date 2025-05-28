import TaskList from "../components/TaskList";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userName = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name.split(" ")[0]; // Solo el primer nombre
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hola, {userName} 👋</h1>
        <button className="logout-button" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;
