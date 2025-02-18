from django.db import models
from users.models import User

class Quiz(models.Model):
    """
    Represents a Quiz that consists of multiple questions.
    """
    title = models.CharField(max_length=255)
    num_questions = models.IntegerField(default=0)  # Ensuring it has a default value
    total_score = models.IntegerField(default=0)  # Ensuring it has a default value
    duration = models.IntegerField(default=30)  # Default 30 minutes duration
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    """
    Represents a Question that belongs to a Quiz.
    """
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    qid = models.CharField(max_length=50, unique=True)
    text = models.TextField()

    # Options with default values
    option_a = models.CharField(max_length=255, default="Option A")
    option_b = models.CharField(max_length=255, default="Option B")
    option_c = models.CharField(max_length=255, default="Option C")
    option_d = models.CharField(max_length=255, default="Option D")

    correct_answer = models.CharField(
        max_length=1, 
        choices=[("A", "A"), ("B", "B"), ("C", "C"), ("D", "D")], 
        default="A"  # Default to first option to avoid null errors
    )

    marks = models.IntegerField(default=1)  # Ensuring each question has a default mark

    def __str__(self):
        return f"{self.qid}: {self.text}"

class Option(models.Model):
    """
    Represents an option for a Question.
    """
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)  # Boolean field to identify the correct answer

    def __str__(self):
        return f"{self.text} ({'Correct' if self.is_correct else 'Incorrect'})"

class QuizAttempt(models.Model):
    """
    Represents a user's attempt at a quiz.
    """
    STATUS_CHOICES = [
        ("In-progress", "In-progress"),
        ("Completed", "Completed"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="In-progress")

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} ({self.status})"

class QuizResponse(models.Model):
    """
    Stores the response of a user for each question in a quiz.
    """
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option, on_delete=models.CASCADE)
    marks_awarded = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.attempt.user.username} - {self.question.qid} ({self.marks_awarded} points)"
