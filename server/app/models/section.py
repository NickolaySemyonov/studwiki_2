from config import config
from utils2 import psycopg2_cursor

class Section():
    
    def __init__(self, name:str, id:int=None):
        self.id=id
        self.name=name
    
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def create(cursor, cls, name):
        try:
            cursor.execute('SELECT * FROM create_section(%s)',(name,))
            result = cursor.fetchone()
            if not result['out_error_message']:
                section = cls(
                    id=result['out_id'],
                    name=name
                )
                return section, None
            else:
                return None, result['out_error_message']
        except Exception as e:
            return None, str(e)
        
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get_list(cursor, cls):
        try:
            # cursor.execute('SELECT * FROM get_section_list()')
            cursor.execute('SELECT * FROM wiki_section')
            result = cursor.fetchall()
           
        except Exception as e:
            return None, str(e)