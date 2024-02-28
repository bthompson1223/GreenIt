from app.models import db, Community, environment, SCHEMA
from sqlalchemy.sql import text
from .community_seeds import communities


# Adds a demo community, you can add other communities here if you want
def seed_communities():
    for community in communities:
        db.session.add(Community(
            owner_id=community['owner_id'], 
            community_name=community["community_name"], 
            description=community['description'],
            image_url=community["image_url"]
        ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities;"))
        
    db.session.commit()