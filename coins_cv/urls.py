from django.contrib import admin
from django.urls import path, include
from coins.views import CoinsView, ProcessImageView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', CoinsView.as_view()),
    path('process-image/', ProcessImageView.as_view()),
]
