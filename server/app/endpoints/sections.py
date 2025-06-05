from flask import Blueprint, jsonify, request
from flask_login import login_required

from ..models.articleMetadata import ArticleMetadata
from ..models.section import Section

sections_bp = Blueprint('sections', __name__)

@login_required
@sections_bp.route('/', methods=['GET'])
def get_sections():
    sections, err_message = Section.get_list()

    if err_message:
        return jsonify({"error": err_message}), 500

    section_id = request.args.get('section_id', type=int)
    if section_id:
        # Find the specific section by ID
        section = next((s for s in sections if s.sectionId == section_id), None)
        if section:
            return jsonify({
                'section': section.__dict__,
                "message": "success"
            })
        else:
            return jsonify({
                "error": f"Section with ID {section_id} not found"
            }), 404

    # If no section_id provided or section not found, return all sections
    sections_data = [section.__dict__ for section in sections]
    return jsonify({
        'sections': sections_data,
        "message": "success"
    })

@login_required
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
        
   