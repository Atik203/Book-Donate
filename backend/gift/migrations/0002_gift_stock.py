# Generated by Django 5.0.6 on 2024-07-17 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gift', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gift',
            name='stock',
            field=models.IntegerField(default=0),
        ),
    ]
