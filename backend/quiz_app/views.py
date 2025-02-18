from rest_framework.decorators import api_view, permission_classes
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Quiz, Question, Option, QuizAttempt, QuizResponse
from .serializers import QuizSerializer, QuestionSerializer

# ===================== Quiz List & Creation ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

# ===================== Create Quiz (Admin) ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="POST", block=True), name="dispatch")
class CreateQuizView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ===================== Fetch Quiz Questions ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class FetchQuizQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        questions = quiz.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ===================== Get Quiz List for Users ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class GetQuizzesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        quizzes = Quiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ===================== Add Questions to Quiz (Admin) ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="POST", block=True), name="dispatch")
class AddQuestionsToQuizView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        questions = request.data.get("questions", [])
        for question_id in questions:
            try:
                question = Question.objects.get(id=question_id)
                quiz.questions.add(question)
            except Question.DoesNotExist:
                return Response({"error": f"Question {question_id} not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Questions added to quiz successfully"}, status=status.HTTP_200_OK)

# ===================== Quiz Participants View ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class QuizParticipantsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, quiz_id):
        participants = QuizAttempt.objects.filter(quiz_id=quiz_id).values("user__username", "score", "status")
        return Response(participants, status=status.HTTP_200_OK)

# ===================== Get Quiz Response ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class QuizResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        user_id = request.user.id
        try:
            attempt = QuizAttempt.objects.get(quiz_id=quiz_id, user_id=user_id)
        except QuizAttempt.DoesNotExist:
            return Response({"error": "No quiz attempt found"}, status=status.HTTP_404_NOT_FOUND)

        response_data = {
            "quiz_title": attempt.quiz.title,
            "total_marks": attempt.quiz.total_score,
            "user_marks": attempt.score,
            "questions": []
        }

        responses = QuizResponse.objects.filter(attempt=attempt)
        for response in responses:
            response_data["questions"].append({
                "question": response.question.text,
                "chosen_option": response.selected_option.text,
                "correct_option": response.question.options.get(is_correct=True).text,
                "marks": response.marks_awarded,
            })

        return Response(response_data, status=status.HTTP_200_OK)

# ===================== Submit Quiz ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="POST", block=True), name="dispatch")
class SubmitQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        attempt, created = QuizAttempt.objects.get_or_create(user=user, quiz=quiz, defaults={"status": "Completed"})

        total_score = 0
        responses_data = request.data.get("responses", [])

        for response in responses_data:
            question_id = response.get("question_id")
            selected_option_id = response.get("selected_option_id")

            try:
                question = Question.objects.get(id=question_id)
                selected_option = Option.objects.get(id=selected_option_id)
                is_correct = selected_option.is_correct
                marks_awarded = question.marks if is_correct else 0
                total_score += marks_awarded

                QuizResponse.objects.create(
                    attempt=attempt,
                    question=question,
                    selected_option=selected_option,
                    marks_awarded=marks_awarded
                )
            except (Question.DoesNotExist, Option.DoesNotExist):
                return Response({"error": "Invalid question or option ID"}, status=status.HTTP_400_BAD_REQUEST)

        attempt.score = total_score
        attempt.status = "Completed"
        attempt.save()

        return Response({"message": "Quiz submitted successfully", "total_score": total_score}, status=status.HTTP_200_OK)

# ===================== Admin Quiz Report ===================== #
@method_decorator(ratelimit(key="user_or_ip", rate="100/s", method="GET", block=True), name="dispatch")
class AdminQuizReportView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, quiz_id):
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        attempts = QuizAttempt.objects.filter(quiz=quiz)
        report_data = {
            "quiz_title": quiz.title,
            "total_participants": attempts.count(),
            "average_score": sum(attempt.score for attempt in attempts) / max(1, attempts.count()),
            "participants": []
        }

        for attempt in attempts:
            report_data["participants"].append({
                "username": attempt.user.username,
                "score": attempt.score,
                "status": attempt.status
            })

        return Response(report_data, status=status.HTTP_200_OK)
