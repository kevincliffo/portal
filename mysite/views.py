# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django import forms
from .forms import UserRegistrationForm
import os
from django.conf import settings
from django import template

def home(request):
    szPDFFilesPath = settings.BASE_DIR + '\\mysite\\static\\pdffiles'
    lcPDFFiles = os.listdir(szPDFFilesPath)
    return render(request, 'mysite/home.html', {'pdffiles':lcPDFFiles})

def logoutsite(request):
    logout(request)
    return render(request, 'mysite/logout.html')

def aboutus(request):
    return render(request, 'mysite/aboutus.html')

def services(request):
    return render(request, 'mysite/services.html')

def blog(request):
    return render(request, 'mysite/blog.html')

def contactus(request):
    return render(request, 'mysite/contactus.html')

def register(request):
    print 'hallo'
    if request.method == 'POST':
        frmRegistration = UserRegistrationForm(request.POST)
        if frmRegistration.is_valid():            
            objUser = frmRegistration.cleaned_data
            
            szUserName = objUser['username']
            szEmail =  objUser['email']
            szPassword =  objUser['password']
            if not (User.objects.filter(username=szUserName).exists() or User.objects.filter(email=szEmail).exists()):
                User.objects.create_user(szUserName, szEmail, szPassword)
                objUser = authenticate(username = szUserName, password = szPassword)
                login(request, objUser)
                return HttpResponseRedirect('/')
            else:
                raise forms.ValidationError('Looks like a username with that email or password already exists')
    else:
        frmRegistration = UserRegistrationForm()
    return render(request, 'mysite/register.html', {'form' : frmRegistration})