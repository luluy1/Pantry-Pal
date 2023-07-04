from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import GroceriesSerializer
from .models import Groceries
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse

def groceries_view(request, recipe_id=None):
    if request.method == 'GET':
        return fetch_groceries(request)
    elif request.method == 'POST':
        user = request.data.get('user')
        ingredients = request.data.get('ingredients')
        recipeURLs = request.data.get('recipeURLs')
        return create_groceries(request, user, ingredients, recipeURLs)
    elif request.method == 'PUT':
        user = request.data.get('user')
        ingredients = request.data.get('ingredients')
        recipeURLs = request.data.get('recipeURLs')
        return update_groceries(request, recipe_id, user, ingredients, recipeURLs)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
#POST
def create_groceries(request, user, ingredients, recipeURLs):
    grocery = Groceries(
        user=user,
        ingredients=ingredients,
        recipeURL=recipeURLs
    )
    grocery.save()


#PUT 
def update_groceries(request, recipe_id, user, ingredients, recipeURLs):
    grocery = Groceries.objects.get(id=recipe_id)

    # Update the fields of the recipe
    grocery.user = user
    grocery.ingredients = ingredients
    grocery.recipeURL = recipeURLs

    # Save the changes
    grocery.save()

#GET
def fetch_groceries(request):
    groceries = Groceries.objects.all() 
    data = {"groceries": list(groceries.values())}
    return JsonResponse(data)

# Create your views here.
class GroceriesView(viewsets.ModelViewSet):
    serializer_class = GroceriesSerializer
    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        queryset = Groceries.objects.all()
        if user:
            queryset = queryset.filter(user=user)
        return queryset
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
