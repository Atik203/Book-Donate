# Generated by Django 5.0.6 on 2024-06-06 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_bookuser_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookuser',
            name='role',
            field=models.CharField(choices=[('User', 'User'), ('Admin', 'Admin')], default='User', max_length=10),
        ),
    ]
