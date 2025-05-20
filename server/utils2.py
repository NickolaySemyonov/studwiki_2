from functools import wraps
import psycopg2
from psycopg2.extras import DictCursor

def psycopg2_cursor(conn_info, dict_cursor=False, autocommit=False):
    """Декоратор для работы с курсором PostgreSQL.
    
    Args:
        conn_info: Параметры подключения для psycopg2.connect()
        dict_cursor: Если True, использует DictCursor для возврата словарей
        autocommit: Если True, включает режим autocommit
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            connection = None
            try:
                connection = psycopg2.connect(**conn_info)
                connection.autocommit = autocommit
                
                cursor_factory = DictCursor if dict_cursor else None
                with connection.cursor(cursor_factory=cursor_factory) as cursor:
                    result = f(cursor, *args, **kwargs)
                
                if not autocommit:
                    connection.commit()
                return result
            
            except psycopg2.Error as e:
                if connection:
                    connection.rollback()
                raise RuntimeError(f"Ошибка базы данных: {e}")
            finally:
                if connection:
                    connection.close()
        return wrapper
    return decorator