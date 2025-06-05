from flask import Blueprint, jsonify, request
from flask_login import login_required

from ..models.versionData import VersionData
from ..models.versionMetadata import VersionMetadata
from ..models.articleCurrent import ArticleCurrent
from ..models.article import Article
articles_bp = Blueprint('articles', __name__)

@login_required
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

@login_required
@articles_bp.route('/article', methods=['GET'])
def get_article():

    article_id = request.args.get('article_id', type=int)
    if not article_id:
        return jsonify({
            'error': 'article_id parameter is required'
        }), 400

    article, err_message = ArticleCurrent.get(article_id)
    if err_message:
        return jsonify({'error': err_message }), 500

    return jsonify({
        'article':article.__dict__,
        'message':'success'
    })
    

@login_required
@articles_bp.route('/edit',methods=['POST'])
def edit_article():
    data = request.get_json()

    err_message = Article.edit(
        articleId=data['articleId'], 
        sectionId=data['sectionId'],
        editorId=data['lastEditorId'],
        name=data['name'],
        quillDelta=data['quillDelta'],
        hidden=data['hidden'],
        commenting=data['commenting']
    )

    if err_message:
        print(err_message)
        return jsonify({"error": err_message}), 400
    
    return jsonify({'message': 'success'})

@login_required
@articles_bp.route('/rollback', methods=['POST'])
def rollback_version():
  
    version_id= request.args.get('version_id', type=int)
    if not version_id:
        return jsonify({
            'error': 'version_id parameter is required'
        }), 400
    
    err_message = Article.rollback_to_version(version_id)
    if err_message:
        print(err_message)
        return jsonify({"error": err_message}), 400
    
    return jsonify({'message': 'success'})

@login_required
@articles_bp.route('/versions', methods=['GET'])
def get_versions_metadata():

    article_id = request.args.get('article_id', type=int)
    if not article_id:
        return jsonify({
            'error': 'article_id parameter is required'
        }), 400
    
    versionMetadataList, err_message = VersionMetadata.get_list(article_id)
    if err_message:
        return jsonify({"error": err_message}), 500

    metadataList = [versionMetadata.__dict__ for versionMetadata in versionMetadataList]
    return jsonify({
        'versionsMetadata': metadataList,
        "message": "success"  
    })
        

@login_required
@articles_bp.route('/version', methods=['GET'])
def get_version_data():
    
    version_id = request.args.get('version_id', type=int)
    if not version_id:
        return jsonify({
            'error': 'article_id parameter is required'
        }), 400
    
    versionData, err_message= VersionData.get_version_data(version_id) 

    if versionData:
        return jsonify({
            'version': versionData.__dict__,
            "message": "success"  
        })
    else:
        return jsonify({
            "error": err_message
        }), 500