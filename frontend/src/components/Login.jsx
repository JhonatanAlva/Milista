import "./Login.css";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido a <span>MiLista</span></h2>
        <button onClick={handleLogin} className="google-button">
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
