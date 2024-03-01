from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, EmailField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class CommunityForm(FlaskForm):
    community_name = StringField('Community Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image_url = FileField("Community Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])