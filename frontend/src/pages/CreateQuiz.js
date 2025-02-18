// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateQuiz = () => {
//   const [quizData, setQuizData] = useState({ title: "", total_score: "", duration: "" });
//   const navigate = useNavigate();

//   const handleCreateQuiz = () => {
//     axios.post(`${process.env.REACT_APP_API_URL}/quizzes/`, quizData)
//       .then(() => navigate("/admin"))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <h2>Create Quiz</h2>
//       <input type="text" placeholder="Title" onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} />
//       <input type="number" placeholder="Total Score" onChange={(e) => setQuizData({ ...quizData, total_score: e.target.value })} />
//       <input type="number" placeholder="Duration (minutes)" onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })} />
//       <button onClick={handleCreateQuiz}>Create</button>
//     </div>
//   );
// };

// export default CreateQuiz;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    const [step, setStep] = useState(1);
    const [quizData, setQuizData] = useState({
        title: "",
        numQuestions: "",
        totalScore: "",
        duration: "",
        questions: [],
    });
    const navigate = useNavigate();

    const handleNext = () => {
        if (!quizData.title || !quizData.numQuestions || !quizData.totalScore || !quizData.duration) {
            alert("Please fill all fields!");
            return;
        }
        setStep(2);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const handleCreateQuiz = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/create-quiz/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                alert("Quiz Created Successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to create quiz.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="create-quiz-container">
            <h2>{step === 1 ? "Create Quiz - Step 1" : "Create Quiz - Step 2"}</h2>
            
            {step === 1 ? (
                <div>
                    <input type="text" placeholder="Enter quiz title"
                        value={quizData.title}
                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} />

                    <input type="number" placeholder="No. of questions"
                        value={quizData.numQuestions}
                        onChange={(e) => setQuizData({ ...quizData, numQuestions: e.target.value })} />

                    <input type="number" placeholder="Enter Total Score"
                        value={quizData.totalScore}
                        onChange={(e) => setQuizData({ ...quizData, totalScore: e.target.value })} />

                    <input type="number" placeholder="Enter Duration (minutes)"
                        value={quizData.duration}
                        onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })} />

                    <button onClick={handleNext}>Next</button>
                </div>
            ) : (
                <div>
                    {[...Array(parseInt(quizData.numQuestions))].map((_, index) => (
                        <div key={index}>
                            <span>Q{index + 1}</span>
                            <input type="text" placeholder="Marks"
                                onChange={(e) => handleQuestionChange(index, "marks", e.target.value)} />
                            <input type="text" placeholder="#QID"
                                onChange={(e) => handleQuestionChange(index, "qid", e.target.value)} />
                        </div>
                    ))}
                    <button onClick={handleCreateQuiz}>Create</button>
                </div>
            )}
        </div>
    );
};

export default CreateQuiz;
