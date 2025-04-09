import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/question.scss';

function Question({ question, answer, setAnswer }) {
  const handleChange = (e) => {
    if (question.type === 'checkbox') {
      const value = e.target.value;
      setAnswer((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else {
      setAnswer(e.target.value);
    }
  };

  return (
    <div className="question-wrapper">
      <h2>{question.question}</h2>

      {question.type === 'radio' &&
        question.options.map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="question"
              value={opt}
              checked={answer === opt}
              onChange={handleChange}
            />
            {opt}
          </label>
        ))}

      {question.type === 'checkbox' &&
        question.options.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              name="question"
              value={opt}
              checked={answer.includes(opt)}
              onChange={handleChange}
            />
            {opt}
          </label>
        ))}

      {question.type === 'text' && (
        <input
          type="text"
          value={answer}
          onChange={handleChange}
          placeholder="Escribe tu respuesta..."
        />
      )}
    </div>
  );
}

export default Question;
