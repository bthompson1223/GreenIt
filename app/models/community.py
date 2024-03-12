from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    owner = db.relationship('User', back_populates = 'communities')
    posts = db.relationship('Post', back_populates = 'community', cascade = 'all, delete-orphan')


    def to_dict(self):
        owner = self.owner.to_dict()
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'community_name': self.community_name,
            'description': self.description,
            'image_url': self.image_url,
            'owner': owner,
        }