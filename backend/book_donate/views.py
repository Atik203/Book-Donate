
from django.http import HttpResponse


def home(request):
    return HttpResponse("You're at the book_donate home page.href='user/' to go to user page.")