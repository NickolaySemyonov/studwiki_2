
from config import config
from utils2 import psycopg2_cursor

class VersionData():
    def __init__(self, id:int, name:str, quillDelta:str):
        self.id=id
        self.name=name
        self.quillDelta=quillDelta

        
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get_version_data(cursor, cls, versionId:int):
        try:
            cursor.execute('SELECT * FROM preview_version(%s)', (versionId,))
            result = cursor.fetchone()
            
            if result:
                versionData = cls(
                    id=versionId,
                    name=result['out_name'],
                    quillDelta=result['out_markdown']
                )
                    
                return versionData, None
              
        except Exception as e:
            return None, str(e)