from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Community, User, db
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms import CommunityForm, EditCommunityForm

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def all_communities():
    communities = Community.query.all()

    return [community.to_dict() for community in communities]

@community_routes.route('/<community>')
def get_one_community(community):
    community = Community.query.filter(Community.community_name == community).first()
    print(community)

    if not community:
        return {'errors': {'message': 'Community not found'}}, 404

    return community.to_dict()

@login_required
@community_routes.route('/new', methods=['POST'])
def create_community():
    form = CommunityForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        community_image = form.data['image_url']
        community_image.filename = get_unique_filename(community_image.filename)
        upload = upload_file_to_s3(community_image)
        print(upload)

        if "url" not in upload:
            return upload
        
        new_community = Community(
            owner_id = current_user.id,
            community_name = form.data['community_name'],
            description = form.data['description'],
            image_url = upload['url']
        )

        db.session.add(new_community)
        db.session.commit()
        return new_community.to_dict()
    
    return form.errors, 401

@login_required
@community_routes.route('/<community>/edit', methods=['PUT'])
def update_community(community):
    community = Community.query.filter(Community.community_name == community).first()
    if not community:
        return {'errors': 'Community not found'}, 404
    if current_user.id is not community.owner_id:
        return {'errors': 'Unauthorized'}
    form = EditCommunityForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_url = form.data['image_url']
        upload = None

        if not isinstance(image_url, str) and image_url is not None:
            image_url.filename = get_unique_filename(image_url.filename)
            upload = upload_file_to_s3(image_url)

            if 'url' not in upload:
                return upload
        
            remove_file_from_s3(community.image_url)

        community.community_name = form.data['community_name'] or community.community_name
        community.description = form.data['description'] or community.description
        community.image_url = upload['url'] if upload else community.image_url
        db.session.commit()
        return community.to_dict()
    
    return form.errors, 401
