from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('usuario/', views.register, name="register"),

    path('nuevoUsuario/', views.nuevo_usuario),
    path('eliminarUsuario/<str:nombre>', views.eliminarUsuario),
    path('editarUsuario/<str:nombre>', views.editarUsuario),
    path('menuS/<str:nombre>', views.guardarCambios),

    path('login/', views.pagLogin, name="pagLogin"),

    path('hangman/<str:nombre>/', views.hangman),
    path('pong/<str:nombre>/', views.pong),
    path('tictactoe/<str:nombre>/', views.tictactoe),
    path('snake/<str:nombre>/', views.snake),
    path('menu/<str:nombre>/', views.menuC),

    path('menuE/<str:nombre>/', views.backMenu, name="menu"),
]
