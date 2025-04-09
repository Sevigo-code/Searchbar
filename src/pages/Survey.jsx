import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import questionsData from '../data/questions.json';
import Question from '../components/Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/survey.scss';

function Survey() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const question = questionsData[current];

  const isAnswerValid = () => {
    if (question.type === 'text') return inputValue.trim() !== '';
    if (question.type === 'radio') return inputValue !== '';
    if (question.type === 'checkbox') return selectedOptions.length > 0;
    return false;
  };

  const handleNext = () => {
    const answer = question.type === 'checkbox' ? selectedOptions : inputValue;
    const updatedAnswers = [...answers, answer];

    setAnswers(updatedAnswers);
    setInputValue('');
    setSelectedOptions([]);

    if (current < questionsData.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem('surveyAnswers', JSON.stringify(updatedAnswers));
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (current === 0) return;
    const prevAnswer = answers[current - 1];

    setCurrent(current - 1);
    setAnswers(answers.slice(0, -1));

    if (question.type === 'checkbox') {
      setSelectedOptions(Array.isArray(prevAnswer) ? prevAnswer : []);
    } else {
      setInputValue(typeof prevAnswer === 'string' ? prevAnswer : '');
    }
  };

  return (
    <div className="survey-container">
      <h2>Pregunta {current + 1} de {questionsData.length}</h2>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="question-block"
      >
        <Question
          question={question}
          answer={question.type === 'checkbox' ? selectedOptions : inputValue}
          setAnswer={question.type === 'checkbox' ? setSelectedOptions : setInputValue}
        />
      </motion.div>

      <div className="btn-group">
        <button
          onClick={handleBack}
          className="btn-back"
          disabled={current === 0}
        >
          Volver
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswerValid()}
          className="btn-next"
        >
          {current + 1 === questionsData.length ? 'Finalizar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}

export default Survey;
