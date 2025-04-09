import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.scss';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenido a la Encuesta</h1>
      <p>Presiona el botón para comenzar.</p>
      <button
        onClick={() => navigate('/survey')}
        className="start-button"
      >
        Iniciar
      </button>
    </div>
  );
}

export default Home;
