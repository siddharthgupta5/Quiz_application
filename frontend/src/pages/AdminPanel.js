import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/quizzes/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Admin Panel
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/admin/create-quiz">
        Create New Quiz
      </Button>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/admin/quiz/${quiz.id}/participants`}
                  sx={{ mt: 2 }}
                >
                  View Participants
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPanel;
