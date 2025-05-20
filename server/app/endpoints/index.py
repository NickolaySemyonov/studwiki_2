from app import app
from flask import render_template


@app.get('/')
@app.get('/index')

def index():
    return render_template('index.html', title='Home')
