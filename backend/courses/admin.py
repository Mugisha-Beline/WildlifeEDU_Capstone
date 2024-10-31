from django.contrib import admin
from .models import Course, UserProgress

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active')
    search_fields = ('title', 'description')

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'progress')
    list_filter = ('course', 'user')
