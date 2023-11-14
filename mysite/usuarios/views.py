from django.contrib import messages
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .forms import usuarioRegister
from django.urls import reverse
from .models import Usuario

# Create your views here.

def login(request):
    template = loader.get_template("usuarios/login.html")
    context = {}
    return HttpResponse(template.render(context, request))

def register(request):
    template = loader.get_template("usuarios/register.html")
    context = {}
    return HttpResponse(template.render(context, request))

def forgot(request):
    template = loader.get_template("usuarios/Forgot.html")
    context = {}
    return HttpResponse(template.render(context, request))

def nuevo_usuario(request):
    if request.method == "POST":
        usuario = request.POST['username']
        email =  request.POST['email']
        contrasena = request.POST['password']
        usuario = Usuario(username=usuario,email=email,password=contrasena)
        usuario.save()
        return HttpResponseRedirect('/')
    else: 
        return render(request, "usuarios/register.html")
    
def pagLogin(request):
    if request.method == "POST":
        try:
            xusuario = Usuario.objects.get(username=request.POST['username'], password=request.POST['password'])
            print("Usuario=", xusuario)
            request.session['username'] = xusuario.username
            template = loader.get_template("usuarios/profile.html")
            context = {}
            return HttpResponse(template.render(context, request))
        except Usuario.DoesNotExist as e:
            messages.success(request, 'Credenciales incorrectas, intentalo denuevo!')
    template = loader.get_template("usuarios/login.html")
    context = {}
    return HttpResponse(template.render(context, request))    

