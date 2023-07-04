from django.contrib import admin
from .models import Groceries

# Register your models here.
class GroceriesAdmin(admin.ModelAdmin):
    list_display = ('user', 'ingredients', 'recipeURL')

admin.site.register(Groceries, GroceriesAdmin)
