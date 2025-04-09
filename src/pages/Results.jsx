import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';
import '../styles/results.scss';
function Results() {
  const navigate = useNavigate();
  let answers = [];

  try {
    const stored = localStorage.getItem('surveyAnswers');
    answers = Array.isArray(JSON.parse(stored)) ? JSON.parse(stored) : [];
  } catch {
    answers = [];
  }

  return (
    <div className="container results-container mt-5">
      <div className="card shadow p-4">
        <h1 className="mb-4 text-center">📝 Resultados de la Encuesta</h1>

        {answers.length === 0 ? (
          <p className="text-muted text-center">No hay respuestas disponibles.</p>
        ) : (
          <ul className="list-group mb-4">
            {answers.map((a, i) => (
              <li key={i} className="list-group-item">
                <strong>{i + 1}. {questionsData[i]?.question}</strong>
                <div>{Array.isArray(a) ? a.join(', ') : a}</div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center">Gracias por completar la encuesta.</p>
        <div className="text-center">
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
