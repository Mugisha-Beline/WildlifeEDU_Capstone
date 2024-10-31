from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='course_images/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    progress = models.IntegerField(default=0)  # Stores the percentage of course completion

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} - {self.course.title} - {self.progress}%"
