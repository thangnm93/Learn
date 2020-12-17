import React, {Component} from 'react';
import InputBox from './input';
import Button from './button';
import Message from './message';
import JobsList from './jobs_list';
import Counter from './counter';
import { loadJobs, createJob, getJob, updateJob, deleteJob } from '../services/jobs'

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '',
            jobs: [],
            editing: false,
            edit_id: 0,
            message: '',
            messageClass: '',
        };
        this.addOrUpdateJob = this.addOrUpdateJob.bind(this);
        this.onChangeTxt = this.onChangeTxt.bind(this);
        this.cancel = this.cancel.bind(this);
        this.editJob = this.editJob.bind(this);
        this.handleDeleteJob = this.handleDeleteJob.bind(this);
    }

    componentDidMount() {
        loadJobs().then((jobs) => this.setState({jobs}));
    }

    onChangeTxt(e) {
        this.setState({
            txt: e.target.value
        });
    }
    
    addOrUpdateJob() {
        let jobs = this.state.jobs;
        let text = this.state.txt;
        if (text.length === 0) {
            this.showMessage("Please enter the job you want to add new!", "error");
            return false;
        }
        if (this.state.editing && this.state.edit_id >= 0) {
            let edit_id = this.state.edit_id;
            updateJob(edit_id, {title: text}).then(() => {
                this.showMessage("Job ID: " + edit_id + " is updated!", "success");
            });
            const editIndex = jobs.findIndex(job => job.id === edit_id);
            jobs[editIndex].title = text;
        } else {
            let job = {userId: 1, id: Date.now(), title: text, completed: false};
            createJob(job).then(() => {
                this.showMessage("Your new job was added!", "success");
            });
            jobs.push(job);
        }
        this.setState({
            jobs: jobs,
            txt: '',
            editing: false,
            edit_id: 0,
        });
    }

    cancel() {
        this.setState({
            txt: '',
            editing: false,
            edit_id: 0,
        });
    }

    showMessage(message, messageClass) {
        this.setState({
            message: message,
            messageClass: messageClass,
        });
        setTimeout(() => this.setState({
            message: '',
            messageClass: ''
        }), 2000);
    }

    handleDeleteJob(id) {
        const deleteIndex = this.state.jobs.findIndex(job => job.id === id);
        if(deleteIndex < 0) {
            this.showMessage("Job ID: " + id + " not exits to delete!", "error");
            return false;
        }
        deleteJob(id);
        let deleteJobs = this.state.jobs;
        deleteJobs.splice(deleteIndex, 1);
        this.setState({
            jobs: deleteJobs
        });
    }

    editJob(id) {
        getJob(id).then((job) => {
            this.setState({
                editing: true,
                txt: job.title,
                edit_id: job.id
            });
        });
    }

    render() {
        return (
            <section className="container">
                <h1 className="title">Jobs List</h1>
                <div className="input-button">
                    <InputBox name="job" value={this.state.txt} placeHolder="Your job" onChange={this.onChangeTxt}/>
                    <Button className="btn-primary" buttonTxt={this.state.editing === true ? 'Update' : 'Add'} onClick={this.addOrUpdateJob} />
                    <Button className="btn-cancel" buttonTxt="Cancel" onClick={this.cancel} />
                </div>
                <Message className={this.state.messageClass} messageTxt={this.state.message}/>
                <Counter count={this.state.jobs.length} />
                <JobsList jobs={this.state.jobs} editJob={this.editJob} deleteJob={this.handleDeleteJob}/>
            </section>
        );
    }
}

export default Jobs;