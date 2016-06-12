from __future__ import unicode_literals
from django.db import models

class Cipher(models.Model):
    creation_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    cipher = models.TextField()
