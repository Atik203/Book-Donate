# Generated by Django 5.0.6 on 2024-06-06 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_delete_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookuser',
            name='phone',
            field=models.CharField(max_length=11),
        ),
    ]
