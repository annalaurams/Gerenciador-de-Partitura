import { useState } from "react";
import "./Login.css";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // 👈 hook de navegação

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);
      //localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login realizado com sucesso!");

      // ✅ REDIRECIONA PARA A LISTA DE PARTITURAS
      navigate("/scores");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message || "Email ou senha inválidos"
      );
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-area">
          <div className="logo-icon">🎵</div>
          <h1>Clave</h1>
        </div>

        <h2>Bem-vindo(a) de volta</h2>
        <p className="description">
          Entre para acessar suas partituras
        </p>

        <div className="form">
          <label>Email</label>
          <input
            type="email"
            placeholder="usuario@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="•••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <span className="forgot-password">
            Esqueci minha senha
          </span> */}

          <button type="button" onClick={handleLogin}>
            Entrar
          </button>
        </div>

        <p className="footer-text">
          Não tem uma conta?{" "}
          <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
