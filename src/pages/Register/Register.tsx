import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { api } from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Conta criada com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao criar conta");
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <div className="logo-area">
          <div className="logo-icon">🎵</div>
          <h1>Clave</h1>
        </div>

        <h2>Criar conta</h2>
        <p>Preencha os dados para se cadastrar</p>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Criar conta</button>

        <span className="login-link" onClick={() => navigate("/")}>
          Já tem uma conta? <strong>Entrar</strong>
        </span>
      </div>
    </div>
  );
}
