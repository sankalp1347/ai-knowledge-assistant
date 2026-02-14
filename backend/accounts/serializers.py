import re
from django.contrib.auth.models import User
from rest_framework import serializers
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
        extra_kwargs={
            'password':{'write_only':True}
        } 
    
    def validate_username(self, value):
        if len(value) < 4:
            raise serializers.ValidationError("Username too short")
        if not re.match(r'^[a-zA-Z0-9_]+$', value):
            raise serializers.ValidationError("Invalid characters")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username exists")
        return value

    def validate_password(self, value):
        pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Weak password")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)