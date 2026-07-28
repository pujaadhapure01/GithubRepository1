from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=10) # Track available quantity

    def __str__(self):
        return f"{self.name} ({self.stock} left)"
