import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/quizzes/${id}/response/`)
      .then((res) => setResult(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!result) return <p>Loading...</p>;

  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Total Marks: {result.total_marks}</p>
      <p>Your Score: {result.user_score}</p>
      {result.responses.map((res) => (
        <div key={res.question}>
          <p><strong>Q:</strong> {res.question}</p>
          <p><strong>Your Answer:</strong> {res.selected_option}</p>
          <p><strong>Correct Answer:</strong> {res.correct_option}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizResult;
