from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user
from app import loginMgr
from ..models.user import User

from app.forms import LoginForm, RegistrationForm
from werkzeug.security import check_password_hash



auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return jsonify({
            'error': 'You are already logged in'
        }), 403
    # Create form from JSON data
    form = LoginForm(data=request.get_json())
    # Validate form
    if not form.validate():
        return jsonify({
            'error': str(form.errors)
        }), 400
    
    # Find user by email
    user, pwhash, err_message = User.find_user_by_email(form.email.data)
    
    if err_message:
        return jsonify({
            'error': err_message
        }), 401
    
    # Check password
    if not check_password_hash(pwhash, form.password.data):
        return jsonify({
            'error': 'Invalid credentials'
        }), 401
    
    # Login user
    login_user(user)
    
    return jsonify({
        'user': {
            'id': user.id,
            'email': user.email,
            'nickname': user.nickname
        }
    })


@auth_bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({})



@auth_bp.route('/register', methods=['POST'])
def register():
    print(request.get_json())  # Добавьте это для отладки
    # Check if user is already authenticated
    if current_user.is_authenticated:
        return jsonify({
            'error': 'You are already logged in'
        }), 403

    # Validate incoming JSON data
    form = RegistrationForm(data=request.get_json())
    if not form.validate():
        return jsonify({
            'error': str(form.errors)
        }), 400

    # Register user
    user, err_message = User.register(
        email=form.email.data,
        password=form.password.data,
        nickname=form.nickname.data
    )

    if err_message:
        return jsonify({
            'error': err_message
        }), 400

    # Login user and return success response
    login_user(user)
    
    return jsonify({
        'user': {
            'id': user.id,
            'email': user.email,
            'nickname': user.nickname
        }
    }), 201


@auth_bp.route('/check_auth', methods=['GET'])

def check_auth():
    if current_user.is_authenticated:
        return jsonify({
            'user': {
                'id': current_user.id,
                'email': current_user.email,
                'nickname': current_user.nickname
            }
        })
    return jsonify({
        'error':'Not authenticated'
    })
    

@loginMgr.user_loader
def load_user(id):
    return User.get(id) 
