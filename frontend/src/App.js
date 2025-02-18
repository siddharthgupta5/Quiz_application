import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuizList from "./pages/QuizList";
import QuizDetail from "./pages/QuizDetail";
import QuizResult from "./pages/QuizResult";
import AdminPanel from "./pages/AdminPanel";
import CreateQuiz from "./pages/CreateQuiz";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quizzes" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><QuizDetail /></ProtectedRoute>} />
        <Route path="/quiz/:id/result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
