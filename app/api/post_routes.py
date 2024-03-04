from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Community, User, db, Post
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
    print('inside posts basic route')
    posts = Post.query.all()
    print(posts)

    return [post.to_dict() for post in posts]

@post_routes.route('/<int:postId>')
def get_one_post(postId):
    post = Post.query.get(postId)
    if post:
        return post.to_dict()
    else:
        return {'errors': {'message': 'Post not found'}}, 404
    
@login_required
@post_routes.route('/new', methods=["POST"])
def create_post():
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['image_url'] is not None:
            post_image = form.data['image_url']
            post_image.filename = get_unique_filename(post_image.filename)
            upload = upload_file_to_s3(post_image)
            print(upload)

            if "url" not in upload:
                return upload
            
            new_post = Post(
                owner_id = current_user.id,
                title = form.data['title'],
                community_id = form.data['community_id'],
                body = form.data['body'],
                image_url = upload['url']
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
        else:
            new_post = Post(
                owner_id = current_user.id,
                title = form.data['title'],
                community_id = form.data['community_id'],
                body = form.data['body'],
                image_url = None
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
    return form.errors, 401

@login_required
@post_routes.route('/<int:postId>/edit', methods=['PUT'])
def edit_post(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': {'message': 'Post not found'}}, 404
    if current_user.id is not post.owner_id:
        return {'errors': 'Unauthorized'}, 401
    
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_url = form.data['image_url']
        print('IMAGE URL =================================', form.data)
        upload = None

        if not isinstance(image_url, str) and image_url is not None:
            image_url.filename = get_unique_filename(image_url.filename)
            upload = upload_file_to_s3(image_url)

            if 'url' not in upload:
                return upload
            if post.image_url is not None:
                remove_file_from_s3(post.image_url)

        post.title = form.data['title'] or post.title
        post.body = form.data['body'] or post.body
        post.community_id = form.data['community_id'] or post.community_id
        post.image_url = upload['url'] if upload else post.image_url
        db.session.commit()
        return post.to_dict()
    
    return form.errors, 401
    

@login_required
@post_routes.route('/<int:postId>/delete', methods=['DELETE'])
def delete_post(postId):
    post = Post.query.get(postId)

    if not post:
        return {'errors': {'message': 'Post not found'}}, 404
    if current_user.id is not post.owner_id:
        return {'errors': 'Unauthorized'}, 401
    

    if post.image_url is not None:
        remove_file_from_s3(post.image_url)
    
    db.session.delete(post)
    db.session.commit()

    return {'message': "Successfully deleted post"}