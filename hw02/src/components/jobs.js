import React, {Component} from 'react';
import InputBox from './input';
import Button from './button';
import Message from './message';
import JobsList from './jobs_list';

const lsKey = 'LS_JOBS';
class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '',
            jobs: this.getJobs(),
            editing: false,
            edit_id: 0,
            message: '',
            messageClass: '',
        };
        this.addOrUpdateJob = this.addOrUpdateJob.bind(this);
        this.onChangeTxt = this.onChangeTxt.bind(this);
        this.cancel = this.cancel.bind(this);
        this.editJob = this.editJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }
    getJobs() {
        try {
            return JSON.parse(localStorage.getItem(lsKey)) || []
        } catch (e) {}
        return [];
    }
    saveJobs() {
        localStorage.setItem(lsKey, JSON.stringify(this.state.jobs));
    }

    onChangeTxt(e) {
        this.setState({
            txt: e.target.value
        });
    }
    addOrUpdateJob() {
        let jobs = this.state.jobs;
        if (this.state.txt.length === 0) {
            this.showMessage("Please enter the job you want to add new!", "error");
            return false;
        }
        if (this.state.editing && this.state.edit_id >= 0) {
            jobs[this.state.edit_id].name = this.state.txt;
            this.showMessage("Job ID: " + jobs[this.state.edit_id].id + " is updated!", "success");
        } else {
            let job = {id: Date.now(), name: this.state.txt};
            jobs.push(job);
            this.showMessage("Your new job was added!", "success");
        }
        this.setState({
            jobs: jobs,
            txt: '',
            editing: false,
            edit_id: 0,
        });
        this.saveJobs();
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
    deleteJob(id) {
        const deleteIndex = this.state.jobs.findIndex(job => job.id === id);
        if(deleteIndex < 0) {
            this.showMessage("Job ID: " + id + " not exits to delete!", "error");
            return false;
        }
        let deleteJobs = this.state.jobs;
        deleteJobs.splice(deleteIndex, 1);
        this.showMessage("Job ID: " + id + " is deleted!", "success");
        this.setState({
            jobs: deleteJobs
        });
        this.saveJobs();
    }

    editJob(id) {
        const editIndex = this.state.jobs.findIndex(job => job.id === id);
        if(editIndex < 0) {
            this.showMessage("Job ID: " + id + " not exits to edit!", "error");
            return false;
        }
        this.setState({
            editing: true,
            edit_id: editIndex,
            txt: this.state.jobs[editIndex].name,
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
                <JobsList jobs={this.state.jobs} editJob={this.editJob} deleteJob={this.deleteJob}/>
            </section>
        );
    }
}

export default Jobs;