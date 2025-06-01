from flask import Blueprint, jsonify, request

from ..models.articleMetadata import ArticleMetadata
from ..models.article import Article
from ..models.section import Section
articles_bp = Blueprint('articles', __name__)


@articles_bp.route('/create', methods=['POST'])
def create_article():

    #print(request.get_json())
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


@articles_bp.route('/sections', methods=['GET'])
def get_sections():
 
    sections, err_message = Section.get_list()

    #print(jsonify(sections))


    if err_message:
        return jsonify({"error": err_message}), 500

    sections_data = [section.__dict__ for section in sections]
    return jsonify ({
        'sections': sections_data,
        "message": "success"
    })


@articles_bp.route('/', methods=['GET'])
def get_article_metadata_list():
   
    section_id = request.args.get('section_id', type=int)
    if not section_id:
        return jsonify({
            'error': 'section_id parameter is required'
        }), 400
    
    articlesMetadataList, err_message = ArticleMetadata.get_list(section_id)
    if err_message:
        return jsonify({"error": err_message}), 500

    metadataList = [articleMetadata.__dict__ for articleMetadata in articlesMetadataList]
    return jsonify({
        'articlesMetadata': metadataList,
        "message": "success"  
    })
        
   