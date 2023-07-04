from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from groceries import views
from groceries.views import GroceriesView
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'groceries', views.GroceriesView, 'groceries')

urlpatterns = [
    path('', GroceriesView.as_view({'get': 'list', 'post': 'create', 'put': 'update'}), name='groceries'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/groceries/', views.groceries_view, name='groceries-post'),
    path('api/groceries/<int:pk>/', views.groceries_view, name='groceries-get-or-put'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
