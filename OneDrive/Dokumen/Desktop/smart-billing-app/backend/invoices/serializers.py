from rest_framework import serializers
from .models import Invoice
from customers.serializers import CustomerSerializer
from products.serializers import ProductSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    customer_details = CustomerSerializer(source='customer', read_only=True)
    product_details = ProductSerializer(source='products', many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'