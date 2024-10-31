from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.get_courses, name='get_courses'),
    path('user_courses/', views.get_user_courses, name='get_user_courses'),
    path('update_progress/<int:course_id>/<int:progress>/', views.update_progress, name='update_progress'),
]
