import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "./ScoreDetails.css";

type Score = {
  id: string;
  name: string;
  composer?: string;
  instrument?: string;
  tone?: string;
  description?: string;
  fileName?: string;
  fileUrl?: string;
  filePath?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ScoreDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadScore() {
      try {
        const response = await api.get<Score>(`/scores/${id}`);
        // console.log("Score carregado:", response.data); 
        setScore(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadScore();
    }
  }, [id]);

  function handleBack() {
    navigate("/scores");
  }

  function handleEdit() {
    navigate(`/scores/edit/${id}`);
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta partitura?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/scores/${id}`);
      alert("Partitura excluída com sucesso!");
      navigate("/scores");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir partitura");
    }
  }

  function handleDownload() {
    if (score?.fileUrl) {
      window.open(score.fileUrl, "_blank");
    }
  }

  function formatDate(dateString?: string) {
    if (!dateString) return "Não informado";

    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function getFileName(): string {
    if (score?.fileName) return score.fileName;
    if (score?.filePath) {
      const parts = score.filePath.split('/');
      return parts[parts.length - 1];
    }
    return "Arquivo da partitura";
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Carregando partitura...</p>
      </div>
    );
  }

  if (error || !score) {
    return (
      <div className="error-container">
        <p className="error-text">Erro ao carregar a partitura</p>
        <button className="btn-back-home" onClick={handleBack}>
          Voltar para partituras
        </button>
      </div>
    );
  }

  const hasFile = score.fileUrl || score.filePath;

  return (
    <div className="score-details-page">
      <header className="details-header">
        <button className="btn-back" onClick={handleBack}>
          ←
        </button>

        <div className="header-logo">
          <div className="header-logo-icon">🎵</div>
          <span className="header-logo-text">Clave</span>
        </div>
      </header>

      <main className="details-content">
        {/* CARD PRINCIPAL */}
        <div className="score-info-card">
          <div className="info-card-header">
            <div className="info-card-icon">
              <span>🎵</span>
            </div>

            <div className="info-card-titles">
              <h1 className="score-title">{score.name}</h1>
              {score.composer && (
                <p className="score-composer">{score.composer}</p>
              )}
            </div>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <div className="info-box-label">
                <span className="info-box-icon"></span>
                Instrumento
              </div>
              <div className="info-box-value">
                {score.instrument || "Não informado"}
              </div>
            </div>

            <div className="info-box">
              <div className="info-box-label">
                <span className="info-box-icon"></span>
                Tom
              </div>
              <div className="info-box-value">
                {score.tone || "Não informado"}
              </div>
            </div>

            <div className="info-box">
              <div className="info-box-label">
                <span className="info-box-icon"></span>
                Criado em
              </div>
              <div className="info-box-value">
                {formatDate(score.createdAt)}
              </div>
            </div>

            <div className="info-box">
              <div className="info-box-label">
                <span className="info-box-icon"></span>
                Atualizado
              </div>
              <div className="info-box-value">
                {formatDate(score.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        {score.description && (
          <div className="description-section">
            <h2 className="section-title">Descrição</h2>
            <p className="description-text">{score.description}</p>
          </div>
        )}

        {/* ARQUIVO */}
        {hasFile && (
          <div className="file-section">
            <h2 className="section-title">Arquivo</h2>

            <div className="file-item">
              <div className="file-info">
                <div className="file-icon-wrapper">
                  <span>📄</span>
                </div>
                <span className="file-name">{getFileName()}</span>
              </div>

              <button className="btn-download" onClick={handleDownload}>
                <span className="download-icon">⬇</span>
                Baixar
              </button>
            </div>
          </div>
        )}

        {/* AÇÕES */}
        <div className="action-buttons">
          <button className="btn-edit" onClick={handleEdit}>
            <span className="action-icon"></span>
            Editar
          </button>

          <button className="btn-delete" onClick={handleDelete}>
            <span className="action-icon"></span>
            Excluir
          </button>
        </div>
      </main>
    </div>
  );
}