from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from products.views import ProductViewSet
from customers.views import CustomerViewSet
from invoices.views import InvoiceViewSet

# Initialize REST Framework Router
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    # JWT Auth Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API App Routes (/api/products/, /api/customers/, /api/invoices/)
    path('api/', include(router.urls)),
]