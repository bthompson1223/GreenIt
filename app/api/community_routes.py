from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Community, User
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms import CommunityForm

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def all_communities():
    communities = Community.query.all()
    print([community.to_dict() for community in communities])

    return [community.to_dict() for community in communities]