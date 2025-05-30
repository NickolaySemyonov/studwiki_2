from config import config
from utils2 import psycopg2_cursor

from .articleVersion import ArticleVersion

class Article():
    
    def __init__(
        self, 
        id:int,
        authorId:int, 
        sectionId:int, 
        hidden:bool, 
        commenting:bool
        ):

        self.id=id
        self.authorId=authorId
        self.sectionId=sectionId
        self.hidden=hidden
        self.commenting=commenting


        
    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def createNew(cursor, cls, sectionId:int, authorId:int, name:str, quillDelta:str):
        try:
            cursor.execute('SELECT * FROM create_article(%s, %s, %s,%s)', 
                (authorId, sectionId, name, quillDelta,))

            result = cursor.fetchone()
            if not result['out_error_message']:
                article=cls(
                    id=result['out_article_id'],
                    authorId=authorId,
                    sectionId=sectionId,
                    hidden=['out_hidden'],
                    commenting=['out_commenting']
                )
                aricleVersion=ArticleVersion(
                    id=['out_version_id'],
                    authorId=authorId,
                    name=name,
                    quillDelta=quillDelta,
                    isActive=['out_version_active']
                )
                return article, aricleVersion, None
            else:
                return None, None, result['out_error_message']
            
        except Exception as e:
            return None, None, str(e)