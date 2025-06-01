from config import config
from utils2 import psycopg2_cursor

class ArticleMetadata():
    def __init__(
        self,
        articleId:int,
        authorId:int,
        sectionId:int,
        authorNickname:str,
        articleName:str,
        hidden:bool,
        lastUpdated:str
        ):
        
        self.sectionId=sectionId
        self.articleId=articleId
        self.authorId=authorId
        self.authorNickname=authorNickname
        self.articleName=articleName
        self.hidden=hidden
        self.lastUpdated=lastUpdated


    @classmethod
    @psycopg2_cursor(config(), dict_cursor=True)
    def get_list(cursor, cls, sectionId:int):
        try:
            cursor.execute('SELECT * FROM get_article_metadata_list(%s)', (sectionId,))
            result = cursor.fetchall()
            
            if result:
                articleMetadataList = []
                for row in result:
                    articleMetadata = cls(
                        articleId=row['article_id'],
                        authorId=row['author_id'],
                        sectionId=row['section_id'],
                        authorNickname=row['author_nickname'],
                        articleName=row['article_name'],
                        hidden=row['article_hidden'],
                        lastUpdated=row['last_updated']
                    )
                    articleMetadataList.append(articleMetadata)
                return articleMetadataList, None
            else:
                return [], None 

        except Exception as e:
            return None, str(e)