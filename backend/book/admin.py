from django.contrib import admin

# Register your models here.
from .models import Book, Genre


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug':('name',)}

admin.site.register(Book)
admin.site.register(Genre, GenreAdmin)