from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Groceries(models.Model):
    user = models.CharField(max_length=100)
    ingredients = ArrayField(models.CharField(max_length=255))
    recipeURL = ArrayField(models.CharField(max_length=255))
