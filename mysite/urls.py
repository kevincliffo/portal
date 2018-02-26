from django.conf.urls import url, include
from django.contrib import admin
from .views import home, register, aboutus, contactus, services, blog, login, logoutsite
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^$', home),
    url(r'^home/', home),
    url(r'^register/', register),
    url(r'^logout/', logoutsite),
    url(r'^aboutus/', aboutus),
    url(r'^contactus/', contactus),
    url(r'^services/', services),
    url(r'^blog/', blog),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)