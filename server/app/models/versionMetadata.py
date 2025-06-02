from config import config
from utils2 import psycopg2_cursor

class VersionMetadata():
    def __init__(self, id:int, date:str, active:bool):
        self.id=id
        self.date=date
        self.active=active

        
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get_list(cursor, cls, articleId:int):
        try:
            cursor.execute('SELECT * FROM get_version_metadata_list(%s)', (articleId,))
            result = cursor.fetchall()
            
            if result:
                versionMetadataList = []
                for row in result:
                    versionMetadata = cls(
                        id=row['version_id'],
                        active=row['version_active'],
                        date=row['last_updated']
                    )
                    versionMetadataList.append(versionMetadata)
                return versionMetadataList, None
            else:
                return [], None 

        except Exception as e:
            return None, str(e)