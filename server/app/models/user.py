from flask_login import UserMixin

from config import config
from utils2 import psycopg2_cursor
from werkzeug.security import generate_password_hash

class User(UserMixin):
    
    def __init__(self, email: str, nickname: str, id: int = None):
        self.id=id
        self.email = email
        self.nickname = nickname
        
    def get_id(self):
        return str(self.id) 

    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get(cursor,cls, id: int):
        try:
            cursor.execute('SELECT * FROM get_user(%s)', (id,))
            result = cursor.fetchone()
            if not result['out_error_message']:
                user = cls(
                    id=result['out_id'],
                    email=result['out_email'],
                    nickname=result['out_nickname']
                )
                return user
            else: 
                return None
            
        except Exception as e:
            print(f'ex:{e}')
            return None
        
        

    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def register(cursor,cls,  email: str, password: str, nickname: str):
        try:
            pwhash = generate_password_hash(password)
            cursor.execute('SELECT * FROM register_user(%s, %s, %s)', (email, pwhash, nickname))
            result = cursor.fetchone()

            if not result['out_error_message']:
                # Возвращаем экземпляр User с id
                user = cls(
                    id=result['out_id'],
                    email=email,
                    nickname=nickname
                )
                return user, None
            else:
                return None, result['out_error_message']

            #return (result['pm_user_id'], None) if not result['pm_error_message'] else (None, result['pm_error_message'])
        
        except Exception as e:
            return None, str(e)
        
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def find_user_by_email( cursor,cls, email):
        try:
            cursor.execute('SELECT * FROM find_user_by_email(%s)', (email,))
            result = cursor.fetchone()

            if not result['out_error_message']:
                user = cls(
                    id=result['out_id'],
                    email=result['out_email'],
                    nickname=result['out_nickname']
                )
                pwhash = result['out_pwhash']
                return user, pwhash, None
            
            else: 
                return None, None, result['out_error_message']

        except Exception as e:
            return None, None, str(e)
        
   
