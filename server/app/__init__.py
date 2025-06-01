from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager



app = Flask(__name__)
loginMgr = LoginManager(app)
loginMgr.login_view = 'auth.login'
app.config['SECRET_KEY'] = 'secret'
app.config['WTF_CSRF_CHECK_DEFAULT'] = False  # Disable CSRF by default
app.config['WTF_CSRF_ENABLED'] = False  # Or disable completely


from .endpoints.articles import articles_bp
from .endpoints.auth import auth_bp
from .endpoints.sections import sections_bp

app.register_blueprint(sections_bp, url_prefix="/api.sections")
app.register_blueprint(articles_bp, url_prefix="/api.articles")
app.register_blueprint(auth_bp, url_prefix="/api.auth")

#CORS(app)
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],  # URL вашего React приложения
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})