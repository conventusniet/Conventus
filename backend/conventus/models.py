from django.db import models

# Create your models here.

class Registration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    branch = models.CharField(max_length=100)
    events = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class ContactResponse(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField()
    message = models.TextField()
    
    def __str__(self):
        return self.name
    
    