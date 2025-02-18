import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import axios from "axios";

const QuizAttempt = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/quizzes/${id}/response/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setQuizData(res.data))
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, [id]);

  return (
    <Container maxWidth="md">
      {quizData ? (
        <>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            {quizData.quiz_title}
          </Typography>
          <Typography variant="h6" align="center">
            Your Score: {quizData.user_marks} / {quizData.total_marks}
          </Typography>
          {quizData.questions.map((q, index) => (
            <Card key={index} sx={{ mt: 2, background: q.chosen_option === q.correct_option ? "#d4edda" : "#f8d7da" }}>
              <CardContent>
                <Typography variant="h6">{q.question}</Typography>
                <Typography variant="body1">Your Answer: {q.chosen_option}</Typography>
                <Typography variant="body1">Correct Answer: {q.correct_option}</Typography>
                <Typography variant="body2">Marks: {q.marks}</Typography>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Typography>Loading quiz data...</Typography>
      )}
    </Container>
  );
};

export default QuizAttempt;
