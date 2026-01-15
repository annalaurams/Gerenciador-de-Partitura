import {
  useState,
  useRef,
  FormEvent,
  DragEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import "./EditScore.css";

type Score = {
  id: string;
  name: string;
  composer: string;
  instrument: string;
  tone: string;
  description: string;
  fileName?: string;
  fileUrl?: string;
};

type ScoreFormData = {
  name: string;
  composer: string;
  instrument: string;
  tone: string;
  description: string;
  file: File | null;
};

export default function EditScore() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [currentFile, setCurrentFile] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const [formData, setFormData] = useState<ScoreFormData>({
    name: "",
    composer: "",
    instrument: "",
    tone: "",
    description: "",
    file: null,
  });

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

  useEffect(() => {
    if (!id) {
      navigate("/scores");
      return;
    }

    async function loadScore() {
      try {
        const response = await api.get<Score>(`/scores/${id}`);
        const score = response.data;

        setFormData({
          name: score.name || "",
          composer: score.composer || "",
          instrument: score.instrument || "",
          tone: score.tone || "",
          description: score.description || "",
          file: null,
        });

        if (score.fileName && score.fileUrl) {
          setCurrentFile({
            name: score.fileName,
            url: score.fileUrl,
          });
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar partitura");
        navigate("/scores");
      } finally {
        setLoading(false);
      }
    }

    loadScore();
  }, [id, navigate]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateAndSetFile(file: File) {
    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert("Formato inválido. Use PDF, PNG ou JPG.");
      return;
    }

    if (file.size > maxSize) {
      alert("Arquivo muito grande (máx. 10MB).");
      return;
    }

    setFormData((prev) => ({ ...prev, file }));
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  }

  function handleDrag(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type !== "dragleave");
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }

  function handleRemoveNewFile() {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleRemoveCurrentFile() {
    setCurrentFile(null);
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("composer", formData.composer);
      data.append("instrument", formData.instrument);
      data.append("tone", formData.tone);
      data.append("description", formData.description);

      if (formData.file) {
        data.append("file", formData.file);
      }

      await api.put(`/scores/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Partitura atualizada com sucesso!");
      navigate(`/scores/${id}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar alterações");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="edit-loading-container">
        <p className="edit-loading-text">Carregando partitura...</p>
      </div>
    );
  }

  return (
    <div className="edit-score-page">
      <div className="edit-form-container">
        <h1 className="edit-form-title">Editar Partitura</h1>

        <form className="edit-score-form" onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label className="edit-form-label">Nome</label>
            <input
              className="edit-form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Compositor</label>
            <input
              className="edit-form-input"
              name="composer"
              value={formData.composer}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label className="edit-form-label">Instrumento</label>
              <select
                className="edit-form-select"
                name="instrument"
                value={formData.instrument}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {instruments.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-form-group">
              <label className="edit-form-label">Tom</label>
              <select
                className="edit-form-select"
                name="tone"
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

          <div className="edit-form-group">
            <label className="edit-form-label">Descrição</label>
            <textarea
              className="edit-form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* ARQUIVO ATUAL */}
          {currentFile && !formData.file && (
            <div className="edit-form-group">
              <label className="edit-form-label">Arquivo atual</label>
              <div className="edit-current-file">
                <div className="edit-file-info">
                  <div className="edit-file-icon">📄</div>
                  <div className="edit-file-details">
                    <div className="edit-file-name">{currentFile.name}</div>
                    <a
                      href={currentFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="edit-file-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visualizar arquivo
                    </a>
                  </div>

                </div>
                <button
                  type="button"
                  className="btn-edit-remove-file"
                  onClick={handleRemoveCurrentFile}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* NOVO ARQUIVO */}
          {formData.file && (
            <div className="edit-form-group">
              <label className="edit-form-label">Novo arquivo</label>
              <div className="edit-selected-file">
                <div className="edit-file-info">
                  <div className="edit-file-icon">📄</div>
                  <div className="edit-file-details">
                    <div className="edit-file-name">{formData.file.name}</div>
                    <div className="edit-file-size">
                      {formatFileSize(formData.file.size)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-edit-remove-file"
                  onClick={handleRemoveNewFile}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* UPLOAD AREA */}
          {!formData.file && (
            <div className="edit-form-group">
              <label className="edit-form-label">
                {currentFile ? "Substituir arquivo" : "Adicionar arquivo"}
              </label>
              <div
                className={`edit-upload-area ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="edit-upload-icon">📤</div>
                <p className="edit-upload-text">
                  Arraste um arquivo ou{" "}
                  <span className="edit-upload-link">clique para selecionar</span>
                </p>
                <p className="edit-upload-formats">PDF, PNG ou JPG (até 10MB)</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="edit-file-input"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
              />
            </div>
          )}

          <div className="edit-form-actions">
            <button
              type="button"
              className="btn-edit-cancel"
              onClick={() => navigate(`/scores/${id}`)}
              disabled={submitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-edit-submit"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}