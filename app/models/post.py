from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    community_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    image_url = db.Column(db.String)

    poster = db.relationship('User', back_populates = 'posts')
    community = db.relationship('Community', back_populates = 'posts')
    comments = db.relationship('Comment', back_populates = 'post', cascade = 'all, delete-orphan')
    likes = db.relationship('Like', back_populates = 'post', cascade = 'all, delete-orphan')

    def to_dict(self):
        poster = self.poster.to_dict()
        community = self.community.to_dict()

        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'body': self.body,
            'community_id': self.community_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'image_url': self.image_url,
            'poster': poster,
            'community': community
        }