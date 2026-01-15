import { useState, useRef, FormEvent, DragEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "./NewScore.css";

type ScoreFormData = {
  name: string;
  composer: string;
  instrument: string;
  tone: string;
  description: string;
  file: File | null;
};

export default function NewScore() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ScoreFormData>({
    name: "",
    composer: "",
    instrument: "",
    tone: "",
    description: "",
    file: null,
  });

  // Lista de instrumentos
  const instruments = [
    "Piano",
    "Violão",
    "Guitarra",
    "Violino",
    "Flauta",
    "Saxofone",
    "Trompete",
    "Bateria",
    "Baixo",
    "Clarinete",
    "Violoncelo",
    "Teclado",
  ];

  // Lista de tons
  const tones = [
    "Dó Maior (C)",
    "Ré Maior (D)",
    "Mi Maior (E)",
    "Fá Maior (F)",
    "Sol Maior (G)",
    "Lá Maior (A)",
    "Si Maior (B)",
    "Dó Menor (Cm)",
    "Ré Menor (Dm)",
    "Mi Menor (Em)",
    "Fá Menor (Fm)",
    "Sol Menor (Gm)",
    "Lá Menor (Am)",
    "Si Menor (Bm)",
  ];

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  }

  function validateAndSetFile(file: File) {
    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert("Formato inválido. Use PDF, PNG ou JPG.");
      return;
    }

    if (file.size > maxSize) {
      alert("Arquivo muito grande. Tamanho máximo: 10MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, file }));
  }

  function handleDrag(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }

  function handleRemoveFile() {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Por favor, preencha o nome da partitura.");
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("composer", formData.composer);
      submitData.append("instrument", formData.instrument);
      submitData.append("tone", formData.tone);
      submitData.append("description", formData.description);
      
      if (formData.file) {
        submitData.append("file", formData.file);
      }

      await api.post("/scores", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Partitura criada com sucesso!");
      navigate("/scores");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar partitura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/scores");
  }

  return (
    <div className="new-score-page">
      <div className="form-container">
        <h1 className="form-title">Nova Partitura</h1>

        <form className="score-form" onSubmit={handleSubmit}>
          {/* Nome da partitura */}
          <div className="form-group">
            <label className="form-label">Nome da partitura</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Ex: Für Elise"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Compositor */}
          <div className="form-group">
            <label className="form-label">Compositor</label>
            <input
              type="text"
              name="composer"
              className="form-input"
              placeholder="Ex: Ludwig van Beethoven"
              value={formData.composer}
              onChange={handleChange}
            />
          </div>

          {/* Instrumento e Tom */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Instrumento</label>
              <select
                name="instrument"
                className="form-select"
                value={formData.instrument}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tom</label>
              <select
                name="tone"
                className="form-select"
                value={formData.tone}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {tones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Adicione detalhes sobre a partitura..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Upload de arquivo */}
          <div className="form-group">
            <label className="form-label">Arquivo da partitura</label>
            
            {!formData.file ? (
              <div
                className={`upload-area ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">📤</div>
                <p className="upload-text">
                  Arraste um arquivo ou{" "}
                  <span className="upload-link">clique para selecionar</span>
                </p>
                <p className="upload-formats">PDF, PNG ou JPG</p>
              </div>
            ) : (
              <div className="selected-file">
                <div className="file-info">
                  <div className="file-icon">📄</div>
                  <div className="file-details">
                    <div className="file-name">{formData.file.name}</div>
                    <div className="file-size">
                      {formatFileSize(formData.file.size)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-remove-file"
                  onClick={handleRemoveFile}
                >
                  ✕
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="file-input"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
            />
          </div>

          {/* Botões de ação */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}