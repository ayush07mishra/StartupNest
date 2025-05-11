from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Email

# Job Posting Form
class JobForm(FlaskForm):
    title = StringField('Job Title', validators=[DataRequired()])
    company = StringField('Company Name', validators=[DataRequired()])
    description = TextAreaField('Job Description', validators=[DataRequired()])
    salary = StringField('Salary')
    job_type = SelectField('Job Type', choices=[('Full-time', 'Full-time'), ('Internship', 'Internship'), ('Freelance', 'Freelance')])
    submit = SubmitField('Post Job')

# Job Application Form
class ApplicationForm(FlaskForm):
    name = StringField('Your Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    resume = FileField('Upload Resume (PDF Only)', validators=[FileAllowed(['pdf'])])
    submit = SubmitField('Apply')
