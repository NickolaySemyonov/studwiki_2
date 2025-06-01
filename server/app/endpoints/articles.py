from flask import Blueprint, jsonify, request

from ..models.articleCurrent import ArticleCurrent
from ..models.article import Article
articles_bp = Blueprint('articles', __name__)


@articles_bp.route('/create', methods=['POST'])
def create_article():

    data = request.get_json()

    article, articleVersion, err_message = Article.createNew(
        sectionId=data['sectionId'],
        authorId=data['authorId'],
        name=data['name'],
        quillDelta=data['quillDelta']
    )

    if err_message:
        print(err_message)
        return jsonify({"error": err_message}), 400
    
    print(article, articleVersion)
    return jsonify ({
        "message": "success"
    }), 201


@articles_bp.route('/article', methods=['GET'])
def get_article():

    article_id = request.args.get('article_id', type=int)

    if not article_id:
        return jsonify({
            'error': 'section_id parameter is required'
        }), 400

    article, err_message = ArticleCurrent.get(article_id)
 
    if err_message:
        return jsonify({'error': err_message }), 500

    return jsonify({
        'article':article.__dict__,
        'message':'success'
    })
    