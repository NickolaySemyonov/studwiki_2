from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import  DataRequired, EqualTo, Length, Email


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=50)])
    password = PasswordField('Password', validators=[DataRequired(), Length(6,50)])
    #submit = SubmitField('Log in')


class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=50)])
    nickname = StringField('Nickname', validators=[DataRequired(), Length(max=50) ])
    password = PasswordField('Password', validators=[DataRequired(), Length(6,50)])
    password2 = PasswordField('Repeat Password',validators=[DataRequired(), EqualTo('password')])
    #submit = SubmitField('Register')

