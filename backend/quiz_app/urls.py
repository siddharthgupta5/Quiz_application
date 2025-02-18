from django.urls import path
from .views import QuizListView, AddQuestionsToQuizView, QuizParticipantsView, QuizResponseView, SubmitQuizView, CreateQuizView

urlpatterns = [
    path("quizzes/", QuizListView.as_view(), name="quiz-list"),
    path("quizzes/<int:quiz_id>/questions/", AddQuestionsToQuizView.as_view(), name="add-questions"),
    path("quizzes/<int:quiz_id>/participants/", QuizParticipantsView.as_view(), name="quiz-participants"),
    path("quizzes/<int:quiz_id>/response/", QuizResponseView.as_view(), name="quiz-response"),
    path("quizzes/<int:quiz_id>/submit/", SubmitQuizView.as_view(), name="submit-quiz"),
    path("quizzes/create/", CreateQuizView.as_view(), name="create-quiz"),
]
