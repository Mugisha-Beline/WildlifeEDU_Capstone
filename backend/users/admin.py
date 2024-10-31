# users/admin.py

from django.contrib import admin
from .models import CustomUser  # Import your custom user model

# Register your custom user model with the admin site
admin.site.register(CustomUser)
