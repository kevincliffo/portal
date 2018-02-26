from django import forms

class UserRegistrationForm(forms.Form):
	username = forms.CharField(
			required = True,
			label = 'Username',
			max_length = 32
		)
	password = forms.CharField(
			required = True,
			label = 'Password',
			max_length = 32,
			widget = forms.PasswordInput()
		)
	email = forms.CharField(
			required = True,
			label = 'User Email',
			max_length = 32,
		)