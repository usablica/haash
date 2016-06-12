from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^encrypt$', views.encrypt),
    url(r'^decrypt/(?P<id>[0-9]+)/(?P<key>[a-zA-Z0-9+/=%]{,32})$', views.decrypt),
]
