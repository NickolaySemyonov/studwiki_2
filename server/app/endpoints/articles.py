from flask import Blueprint, jsonify, request
from ..models.article import Article
articles_bp = Blueprint('articles', __name__)


@articles_bp.route('/create', methods=['POST'])
def create_article():

    print(request.get_json())
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
    
    print(article,articleVersion)
    return jsonify ({
        "message": "success"
    }), 201

   