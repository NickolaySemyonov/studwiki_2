from config import config
from utils2 import psycopg2_cursor

class ArticleVersion():
    def __init__(
        self, 
        id:int,
        authorId:int,
        name:str, 
        quillDelta:str,
        isActive:bool
        ):

        self.id=id
        self.authorId=authorId
        self.name=name 
        self.quillDelta=quillDelta
        self.isActive=isActive
    


