from django.shortcuts import render

def index(request):
    return render(request, 'home/views/index.html')
