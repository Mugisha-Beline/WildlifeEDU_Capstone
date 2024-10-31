# users/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView

User = get_user_model()

class SignupView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer  # Create a serializer for user

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
