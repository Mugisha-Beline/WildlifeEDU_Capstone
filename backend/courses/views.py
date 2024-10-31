from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Course, UserProgress
from django.contrib.auth.decorators import login_required

# Retrieve all courses
def get_courses(request):
    courses = Course.objects.all()
    course_data = [{"id": course.id, "title": course.title, "description": course.description, "image": course.image.url if course.image else ""} for course in courses]
    return JsonResponse({'courses': course_data})

# Retrieve user's progress for courses
@login_required
def get_user_courses(request):
    user_progress = UserProgress.objects.filter(user=request.user)
    progress_data = [{"course": progress.course.title, "progress": progress.progress} for progress in user_progress]
    return JsonResponse({'user_courses': progress_data})

# Update progress for a course
@login_required
def update_progress(request, course_id, progress):
    course = get_object_or_404(Course, id=course_id)
    user_progress, created = UserProgress.objects.get_or_create(user=request.user, course=course)
    user_progress.progress = progress
    user_progress.save()
    return JsonResponse({'status': 'Progress updated'})
