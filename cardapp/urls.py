from django.urls import path

from cardify import settings
from cardify.settings import BASE_DIR
from .views import *
from django.conf.urls.static import static

urlpatterns =[
    path('users/',UserList.as_view()),
    path('users/<int:pk>',UserId.as_view()),
    path('cards/',CardsList.as_view()),
    path('cards/<uuid:uuid>/',CardByUUID.as_view()),
    
]

urlpatterns += static(
    settings.STATIC_URL,
    document_root=BASE_DIR / "static"
)