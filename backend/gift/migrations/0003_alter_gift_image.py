# Generated by Django 5.0.6 on 2024-08-14 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gift', '0002_gift_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gift',
            name='image',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]