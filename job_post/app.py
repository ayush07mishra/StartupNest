import os
from flask import Flask, render_template, redirect, url_for, request
from models import db, Job, Application
from forms import JobForm, ApplicationForm
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/resumes'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
db.init_app(app)

# Home Route
@app.route('/')
def home():
    return render_template('index.html')

# Job Posting Route
@app.route('/post-job', methods=['GET', 'POST'])
def post_job():
    form = JobForm()
    if form.validate_on_submit():
        new_job = Job(
            title=form.title.data,
            company=form.company.data,
            description=form.description.data,
            salary=form.salary.data,
            job_type=form.job_type.data
        )
        db.session.add(new_job)
        db.session.commit()
        return redirect(url_for('view_jobs'))
    return render_template('job_post.html', form=form)

# View Jobs
@app.route('/jobs')
def view_jobs():
    jobs = Job.query.all()
    return render_template('job_list.html', jobs=jobs)

# Apply for Jobs
@app.route('/apply/<int:job_id>', methods=['GET', 'POST'])
def apply(job_id):
    form = ApplicationForm()
    job = Job.query.get_or_404(job_id)
    
    if form.validate_on_submit():
        if form.resume.data:
            filename = secure_filename(form.resume.data.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            form.resume.data.save(filepath)
        else:
            filepath = None

        application = Application(
            name=form.name.data,
            email=form.email.data,
            resume_path=filepath,
            job_id=job_id
        )
        db.session.add(application)
        db.session.commit()
        return "Application Submitted Successfully!"
    
    return render_template('apply.html', form=form, job=job)

# Admin Panel
@app.route('/admin')
def admin():
    jobs = Job.query.all()
    applications = Application.query.all()
    return render_template('admin.html', jobs=jobs, applications=applications)

if __name__ == '__main__':
    app.run(debug=True)
