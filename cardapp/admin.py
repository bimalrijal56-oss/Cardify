from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=['id','name','job','email','tel','address','fb_link','insta_link','linkedin_link']
    search_fields = ['id','name']
    
    
@admin.register(Cards)
class CardsAdmin(admin.ModelAdmin):
    list_display=['id','user','title','name','job','company','address','email','tel','theme','created_at','fb_link','insta_link','linkedin_link']
    search_fields = ['id','title','name','job','company','theme']
    