from .models import User
from .serializers import UserSerializer, RegisterUserSerializer

from django.contrib.auth import login
from django.db.models.query import QuerySet

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


#  creates a user
class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#returns all users
class UserList(generics.ListAPIView):
    # permission_classes = [DjangoModelPermissions]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

# returns the profile of the current authenticated user
class LoggedInUserDetail(generics.ListAPIView):
    permission_classes = [AllowAny]
    # DjangoModelPermissions
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
       
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        user = self.request.user
        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.filter(id=user.id)
        return queryset


# Returns a single
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [DjangoModelPermissions]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
