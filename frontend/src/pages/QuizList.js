import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/quizzes/`)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3 }}>Available Quizzes</Typography>
      {quizzes.map((quiz) => (
        <Card key={quiz.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{quiz.title}</Typography>
            <Typography variant="body2">Total Score: {quiz.total_score}</Typography>
            <Button variant="contained" color="primary" component={Link} to={`/quiz/${quiz.id}`}>Start Quiz</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default QuizList;
