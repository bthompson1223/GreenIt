from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .comment_seeds import comments


# Adds a demo community, you can add other communities here if you want
def seed_comments():
    for comment in comments:
        db.session.add(Comment(
            owner_id=comment['owner_id'],
            post_id=comment['post_id'],
            comment=comment['comment'],
            parent=comment['parent']
        ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments;"))
        
    db.session.commit()