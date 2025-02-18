

// import React, { useEffect, useState, useContext } from "react";
// import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const username = localStorage.getItem("username") || "User"; // Get stored username
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/quizzes/`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       })
//       .then((res) => setQuizzes(res.data))
//       .catch((err) => console.error("Error fetching quizzes:", err));
//   }, []);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" sx={{ mb: 4 }}>
//         Hi, {username}! Welcome to the Online Quiz System
//       </Typography>
//       <Grid container spacing={3}>
//         {quizzes.map((quiz) => (
//           <Grid item xs={12} sm={6} md={4} key={quiz.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{quiz.title}</Typography>
//                 <Typography variant="body2">Total Score: {quiz.total_score}</Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   component={Link}
//                   to={`/quiz/${quiz.id}`}
//                   sx={{ mt: 2 }}
//                 >
//                   Start Quiz
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Redirecting to login.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Redirecting to login.");
          return;
        }
    
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/quizzes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
    fetchQuizzes();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Hi, {username}! Welcome to the Online Quiz System
      </Typography>
      <Grid container spacing={3}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Typography variant="body2">Total Score: {quiz.total_score}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/quiz/${quiz.id}`}
                    sx={{ mt: 2 }}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4, width: "100%" }}>
            No quizzes available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
