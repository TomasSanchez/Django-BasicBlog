
import json

from .models import User, UserFollowing
from .serializers import FollowingSerializer, UserSerializer

from django.http import JsonResponse
from django.db.models.query import QuerySet
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout

from rest_framework import filters, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


class FollowingView(generics.UpdateAPIView):
    
    permission_classes = [AllowAny]
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingSerializer


    def update(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user_to_follow = User.objects.get(id=pk)
        loged_user = self.request.user
        # If loged user wants to follow a user (to_follow) check if the relation exists
        if user_to_follow.followers.all().filter(user_id=loged_user.id).exists():
            print('---------------------------------------------------')
            print('relation exists, deleting')
            print('---------------------------------------------------')
            # if already there, then unfollow, like a toggle
            user_to_follow.followers.all().get(user_id=loged_user.id).delete()
            response = JsonResponse({"Info": "Success - Deleted"})
        else:
            print('---------------------------------------------------')
            print('relation does not exists, creating')
            print('---------------------------------------------------')
            # if it does not exists, create the relation
            UserFollowing.objects.create(user_id=loged_user,following_user_id=user_to_follow)
            response = JsonResponse({"Info": "Success - Following"})
        return response

class CreateUser(APIView):
    
    def post(self, request):
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response({'detail': 'User Created'}, status=status.HTTP_201_CREATED)
        print(reg_serializer.errors)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return JsonResponse(
            {"errors": {"__all__": "Please enter both username and password"}},
            status=400,
        )
    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"detail": "User logged in successfully"})
    return JsonResponse({"detail": "Invalid credentials"}, status=400)


@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"detail": "Logout Successful"})


#returns all users
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# returns the profile of the current authenticated user
class LoggedInUserDetail(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
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
    queryset = User.objects.all()
    serializer_class = UserSerializer


# for checking if user is loged in
class WhoAmI(APIView):

    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            user = request.user
            return Response({ 'id':user.id, 'email':user.email, 'user_name':user.user_name,
                            'first_name':user.first_name, 'last_name':user.last_name, 'following': user.following.all().values()})
        return Response({'AnonymousUser'})


class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class SearchView(generics.ListAPIView):
    filter_backends = (DynamicSearchFilter,)
    queryset = User.objects.all()
    serializer_class = UserSerializer