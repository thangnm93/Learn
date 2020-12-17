import Message from './message';
import JobItem from './job_item';
export default function JobsList(props) {
    const {jobs, editJob, deleteJob} = props;
    return (
        <div className="table-jobs">
        {
            jobs.length === 0 
            ?
                <Message className="text-center" messageTxt="The list of jobs is empty."/>
            :
            <table>
                <thead>
                    <tr>
                        <td>Job Name</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                {jobs.map((job, index) => 
                    <JobItem key={job.id} job={job} editJob={editJob} deleteJob={deleteJob}/>
                )}
                </tbody>
            </table>
        }
        </div>
    );
}