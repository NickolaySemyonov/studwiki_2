from flask import Blueprint, flash, redirect, render_template, request,url_for, jsonify
from flask_login import current_user, login_user, logout_user
from app import loginMgr
from urllib.parse import quote
from ..models.user import User

from app.forms import LoginForm, RegistrationForm
from werkzeug.security import check_password_hash




auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))
    # form = LoginForm()
    # if form.validate_on_submit():
    #     user, pwhash, err_message = User.find_user_by_email(form.email.data)
    #     if err_message:
    #         flash(err_message)
    #         return redirect(url_for('.login'))
    #     if not check_password_hash(pwhash, form.password.data):
    #         flash('invalid credentials')
    #         return redirect(url_for('.login'))
    #     login_user(user)
    #     next_page = request.args.get('next')
    #     if not next_page or quote(next_page).netloc != '':
    #         next_page = url_for('index')
    #     return redirect(next_page)
    
    # return render_template('login.html', title='Login', form=form)
    if current_user.is_authenticated:
        return jsonify({
            'success': False,
            'message': 'You are already logged in'
        }), 403
    # Create form from JSON data
    form = LoginForm(data=request.get_json())
    # Validate form
    if not form.validate():
        return jsonify({
            'success': False,
            'errors': form.errors
        }), 400
    
    # Find user by email
    user, pwhash, err_message = User.find_user_by_email(form.email.data)
    
    if err_message:
        return jsonify({
            'success': False,
            'message': err_message
        }), 401
    
    # Check password
    if not check_password_hash(pwhash, form.password.data):
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401
    
    # Login user
    login_user(user)
    
    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'nickname': user.nickname
        }
    }), 200


@auth_bp.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return redirect(url_for('index'))


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))
    # form = RegistrationForm()
    # if form.validate_on_submit():
    #     user, err_message = User.register(
    #         email=form.email.data,
    #         password=form.password.data,
    #         nickname=form.nickname.data
    #     )
    #     if err_message:
    #         flash(err_message)
    #         return redirect(url_for('.register'))
    #     login_user(user)
    #     return redirect(url_for('index'))
    
    # return render_template('register.html', title='Register', form=form)

    # Check if user is already authenticated
    if current_user.is_authenticated:
        return jsonify({
            'success': False,
            'message': 'You are already logged in'
        }), 403

    # Validate incoming JSON data
    form = RegistrationForm(data=request.get_json())
    if not form.validate():
        return jsonify({
            'success': False,
            'errors': form.errors
        }), 400

    # Register user
    user, err_message = User.register(
        email=form.email.data,
        password=form.password.data,
        nickname=form.nickname.data
    )

    if err_message:
        return jsonify({
            'success': False,
            'message': err_message
        }), 400

    # Login user and return success response
    login_user(user)
    
    return jsonify({
        'success': True,
        'message': 'Registration successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'nickname': user.nickname
        }
    }), 201




@loginMgr.user_loader
def load_user(id):
    return User.get(id) 
