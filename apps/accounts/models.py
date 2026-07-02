from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Custom user so we can extend it later (phone, address, etc.)
    without a painful migration down the road."""

    phone_number = models.CharField(max_length=20, blank=True)
    is_seller = models.BooleanField(default=False)
    def __str__(self):
        return self.username
