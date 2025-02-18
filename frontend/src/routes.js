import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuizList from "./pages/QuizList";
import QuizDetail from "./pages/QuizDetail";
import QuizResult from "./pages/QuizResult";
import AdminPanel from "./pages/AdminPanel";
import CreateQuiz from "./pages/CreateQuiz";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/quiz/:id/result" element={<QuizResult />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
