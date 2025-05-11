from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
app.config['SECRET_KEY'] = 'supersecretkey'
db = SQLAlchemy(app)

# Job Model
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    company = db.Column(db.String(50), nullable=False)
    salary = db.Column(db.String(20), nullable=True)
    job_type = db.Column(db.String(20), nullable=False)

# Application Model
class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    resume_path = db.Column(db.String(200), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database created successfully!")
