from config import config
from utils2 import psycopg2_cursor


class ArticleCurrent():
    
    def __init__(
        self, 
        sectionId:int, 
        articleId:int,
        authorId:int, 
        lastEditorId:int,
        authorNickname:str,
        lastEditorNickname:str,
        quillDelta:str,
        lastUpdated:str,
        hidden:bool, 
        commenting:bool,
        ):

        self.sectionId=sectionId 
        self.articleId=articleId
        self.authorId=authorId 
        self.lastEditorId=lastEditorId
        self.authorNickname=authorNickname
        self.lastEditorNickname=lastEditorNickname 
        self.quillDelta=quillDelta       
        self.lastUpdated=lastUpdated
        self.hidden=hidden
        self.commenting=commenting


    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get(cursor, cls, articleId):
        try:
            cursor.execute('SELECT * FROM get_current_article(%s)', (articleId,))
            result = cursor.fetchone()
            if not result['out_err_message']:
                articleCurrent = cls (
                    sectionId=result['out_section_id'], 
                    articleId=result['out_article_id'],
                    authorId=result['out_author_id'],
                    lastEditorId=result['out_last_editor_id'],
                    authorNickname=result['out_author_nickname'],
                    lastEditorNickname=result['out_last_editor_nickname'] ,
                    quillDelta=result['out_article_markdown'],     
                    lastUpdated=result['out_last_updated'],
                    hidden=result['out_article_hidden'],
                    commenting=result['out_article_commenting']
                )
                return articleCurrent, None
            else:
                return None, result['out_err_message']
            
        except Exception as e:
            return None, str(e)


