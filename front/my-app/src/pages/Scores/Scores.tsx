import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Scores.css";

type Score = {
  id: string;
  name: string;
  composer?: string;
  instrument?: string;
  tone?: string;
};

export default function Scores() {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  // Pega o nome do usuário (pode vir do contexto ou localStorage)
  const userName = "João Silva";

  useEffect(() => {
    async function loadScores() {
      try {
        const response = await api.get("/scores");
        setScores(response.data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar partituras");
      } finally {
        setLoading(false);
      }
    }

    loadScores();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleNewScore() {
    navigate("/scores/new");
  }

  function handleScoreClick(scoreId: string) {
    navigate(`/scores/${scoreId}`);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading">Carregando partituras...</p>
      </div>
    );
  }

  return (
    <div className="scores-page">
      <header className="scores-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🎵</div>
            <span className="logo-text">Clave</span>
          </div>
        </div>

        <div className="header-right">
          <button className="btn-add" onClick={handleNewScore}>
            <span className="plus-icon">+</span>
            Nova Partitura
          </button>

          <button className="btn-filters">
            <span className="filter-icon">⚙</span>
            Filtros
          </button>

          <div className="user-info">
            <div className="avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="user-details">
              <span className="user-name">{userName}</span>
            </div>
          </div>

          <button className="btn-logout" onClick={handleLogout}>
            ↗
          </button>
        </div>
      </header>

      <main className="scores-content">
        <h2 className="content-title">Suas Partituras ({scores.length})</h2>

        <div className="scores-grid">
          {scores.map((score) => (
            <div
              key={score.id}
              className="score-card"
              onClick={() => handleScoreClick(score.id)}
            >
              <div className="card-icon">
                <span className="music-icon">🎵</span>
              </div>

              <div className="card-content">
                <h3 className="score-name">{score.name}</h3>

                <div className="score-meta">
                  {score.composer && (
                    <div className="meta-item">
                      <span className="meta-icon">👤</span>
                      <span className="meta-text">{score.composer}</span>
                    </div>
                  )}

                  {score.instrument && (
                    <div className="meta-item">
                      <span className="meta-icon">🎹</span>
                      <span className="meta-text">{score.instrument}</span>
                    </div>
                  )}

                  {score.tone && (
                    <div className="meta-item">
                      <span className="meta-icon">🔑</span>
                      <span className="meta-text">{score.tone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {scores.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma partitura cadastrada ainda.</p>
            <button className="btn-add" onClick={handleNewScore}>
              + Adicionar primeira partitura
            </button>
          </div>
        )}
      </main>
    </div>
  );
}