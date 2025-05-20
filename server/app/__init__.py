from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager



app = Flask(__name__)
loginMgr = LoginManager(app)
loginMgr.login_view = 'login'
app.config['SECRET_KEY'] = 'secret'
app.config['WTF_CSRF_CHECK_DEFAULT'] = False  # Disable CSRF by default
app.config['WTF_CSRF_ENABLED'] = False  # Or disable completely

from .endpoints import index
from .endpoints.users import users_bp
from .endpoints.auth import auth_bp

app.register_blueprint(users_bp)
app.register_blueprint(auth_bp)

CORS(app)