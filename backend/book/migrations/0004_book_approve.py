# Generated by Django 5.0.6 on 2024-07-16 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0003_genre_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='approve',
            field=models.CharField(blank=True, choices=[('Pending', 'Pending'), ('Approved', 'Approved')], default='Pending', max_length=20, null=True),
        ),
    ]