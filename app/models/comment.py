from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    parent = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    commenter = db.relationship('User', back_populates = 'comments')
    post = db.relationship('Post', back_populates = 'comments')

    def to_dict(self):
        

        return {
            'id': self.id,
            'comment': self.comment,
            'user_image': self.commenter.profile_img,
            'username': self.commenter.username,
            'owner_id': self.owner_id,
            'post_id': self.post_id,
            'parent': self.parent,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }