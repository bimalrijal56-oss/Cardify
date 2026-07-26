from django.shortcuts import render
from rest_framework import generics,permissions,status
from .serializers import *
from .models import *
from rest_framework.validators import ValidationError
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.db import IntegrityError
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.


class UserList(generics.ListCreateAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializers
    permission_classes= [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self,serializer):
        serializer.save()
        
class UserId(generics.RetrieveDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializers
    permission_classes= [permissions.IsAuthenticatedOrReadOnly]
    
    def delete(self,request,*args,**kwargs):
        user = User.objects.filter(id=self.kwargs['pk'])
        if user.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            raise ValidationError("User doesnot exist",status=status.HTTP_404_NOT_FOUND)
        
        
        
class CardsList(generics.ListCreateAPIView):
    queryset=Cards.objects.all()
    serializer_class=CardsSerializers
    permission_classes=[permissions.AllowAny]
    
    def perform_create(self,serializer):
        serializer.save()
        
class CardsId(generics.RetrieveDestroyAPIView):
    queryset =Cards.objects.all()
    serializer_class=CardsSerializers
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    
    def delete(self,request,*args,**kwargs):
        card = Cards.objects.filter(id=self.kwargs['pk'])
        if card.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            raise ValidationError("Card doesnot exist",status=status.HTTP_404_NOT_FOUND)        
        
        
@csrf_exempt
def signup(request):
    if request.method =='POST':
        try:
            data = JSONParser().parse(request)
            if User.objects.filter(email=data.get('email')).exists():
                return JsonResponse({"error":"Email already exists"},status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create(
                name=data.get('username'),
                email=data.get('email'),
                job=data.get('profession'),
                company=data.get('institute'),
                address=data.get('address'),
                password=make_password(data.get('password')),
                )
            return JsonResponse({"message":"User created sucessfully","id":user.id},status=201)
        except Exception as e:
         return JsonResponse({"error":str(e)},status=400)
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)  
        
        
        
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        if not check_password(data['password'], user.password):
            return JsonResponse({"error": "Invalid email or password"}, status=400)

        return JsonResponse({
            "message": "Logged in successfully",
            "user_id": user.id,
            "username": user.name
        }, status=200)

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)
    
    
    
class CardByUUID(generics.RetrieveDestroyAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializers
    lookup_field = 'uuid'
    permission_classes = [permissions.AllowAny]