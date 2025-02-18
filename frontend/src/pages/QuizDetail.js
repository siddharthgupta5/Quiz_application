import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/quizzes/${id}/`)
      .then((res) => {
        setQuiz(res.data);
        return axios.get(`${process.env.REACT_APP_API_URL}/quizzes/${id}/questions/`);
      })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/quizzes/${id}/submit/`, { answers })
      .then(() => navigate(`/quiz/${id}/result`))
      .catch((err) => console.error(err));
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>Total Score: {quiz.total_score}</p>
      {questions.map((q) => (
        <div key={q.id}>
          <h4>{q.text}</h4>
          {q.options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option.id}
                onChange={() => handleOptionChange(q.id, option.id)}
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizDetail;
