from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    body = TextAreaField("Body", validators=[DataRequired()])
    image_url = FileField("Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    community_id = IntegerField("Community", validators=[DataRequired()])