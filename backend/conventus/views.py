from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Registration
from .serializers import RegistrationSerializer, ContactResponseSerializer

# Create your views here.

class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Your Response Have Been Saved Successfully."})
        return Response({"message":"Your Response Have Been Failed Successfully."})

class ContactResponseView(APIView):
    def post(self, request):
        serializer = ContactResponseSerializer(data = request.data)
        if serializer.is_valid():
            