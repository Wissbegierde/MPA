from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('usuario/', views.register, name="register"),
    path('forgot/', views.forgot, name="forgot"),
    path('nuevoUsuario/', views.nuevo_usuario),
    path('pagLogin/', views.pagLogin, name="pagLogin"),
]
