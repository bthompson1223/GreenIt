from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Community, User, db
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms import CommunityForm

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def all_communities():
    communities = Community.query.all()

    return [community.to_dict() for community in communities]

@community_routes.route('/<community>')
def get_one_community(community):
    community = Community.query.filter(Community.community_name == community).first()
    print(community)

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
            community_name = form.data['community_name'],
            description = form.data['description'],
            image_url = upload['url']
        )

        db.session.add(new_community)
        db.session.commit()
        return new_community.to_dict()
    
    return form.errors, 401