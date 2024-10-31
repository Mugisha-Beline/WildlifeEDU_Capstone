# wildlifedu/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/', include('courses.urls')),
    path('forum/', include('forum.urls')),
    path('users/', include('users.urls')),
]
