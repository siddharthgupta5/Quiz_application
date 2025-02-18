from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import User
from .serializers import RegisterSerializer, LoginSerializer

# ===================== User Registration API ===================== #
@method_decorator(ratelimit(key="ip", rate="100/s", method="POST", block=True), name="dispatch")
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allows anyone to register

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ===================== User Login API ===================== #
@method_decorator(ratelimit(key="ip", rate="100/s", method="POST", block=True), name="dispatch")
class LoginView(APIView):
    permission_classes = [AllowAny]  # Allows anyone to log in

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)  # Generate JWT tokens
            return Response({
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "username": user.username,
                    "role": user.role,
                    "is_admin": user.role == "admin"
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ===================== User Logout API ===================== #
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can log out

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Invalidate the refresh token
            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    return Response({"username": request.user.username})