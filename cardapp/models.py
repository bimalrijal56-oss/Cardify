from django.db import models
import uuid

# Create your models here.


class User(models.Model):
    
    name=models.CharField(max_length=50)
    image=models.ImageField(upload_to='static/User/' ,blank=True,null=True)
    job=models.CharField(max_length=100)
    company= models.CharField(max_length=100)
    email=models.EmailField(max_length=100,unique=True)
    password=models.CharField(max_length=100)
    tel=models.CharField(max_length=10)
    address=models.CharField(max_length=200)
    fb_link=models.URLField(null=True,blank=True)
    insta_link=models.URLField(null=True,blank=True)
    linkedin_link=models.URLField(null=True,blank=True)
    
    def __str__(self):
        return self.name
    
    
    
class Cards(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4,unique=True,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True,related_name='cards')
    title = models.CharField(max_length=100,blank=True,null=True)
    name= models.CharField(max_length=50,blank=True,null=True)
    job = models.CharField(max_length=100,blank=True,null=True)
    company = models.CharField(max_length=100,blank=True,null=True)
    address = models.CharField(max_length=200,blank=True,null=True)
    email = models.EmailField(max_length=100,blank=True,null=True)
    tel = models.CharField(max_length=10,blank=True,null=True)
    image = models.ImageField(upload_to='Cards/', blank=True, null=True)
    web_url= models.URLField(null=True,blank=True)
    fb_link =models.URLField(null=True,blank=True)
    insta_link=models.URLField(null=True,blank=True)
    twitter_link=models.URLField(null=True,blank=True)
    linkedin_link=models.URLField(null=True,blank=True)
    theme = models.CharField(max_length=50,blank=True,null=True)
    slug = models.SlugField(max_length=60,unique=True,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    