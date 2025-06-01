from flask import Blueprint, jsonify, request

from ..models.articleMetadata import ArticleMetadata
from ..models.section import Section

sections_bp = Blueprint('sections', __name__)


@sections_bp.route('/', methods=['GET'])
def get_sections():
    sections, err_message = Section.get_list()

    if err_message:
        return jsonify({"error": err_message}), 500

    sections_data = [section.__dict__ for section in sections]
    return jsonify ({
        'sections': sections_data,
        "message": "success"
    })

@sections_bp.route('/section', methods=['GET'])
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
        
   