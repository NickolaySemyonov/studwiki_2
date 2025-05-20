from flask import Blueprint, jsonify
import psycopg2
from psycopg2.extras import DictCursor
from config import config
from utils2 import psycopg2_cursor
users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
@psycopg2_cursor(config(), dict_cursor=True)
def get_users(cursor):
    # with psycopg2.connect(**config()) as con:
    #     with con.cursor(cursor_factory=DictCursor) as crsr:
    #         crsr.execute("SELECT * FROM wiki_user")
    #         data = [dict(row) for row in crsr.fetchall()]
    cursor.execute("SELECT * FROM wiki_user")
    data = cursor.fetchall()
    return jsonify(data)

