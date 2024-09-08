from django.db import models

# Create your models here.

class Registration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    organization = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class ContactResponse(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField()
    message = models.TextField()
    
    def __str__(self):
        return self.name
    
    