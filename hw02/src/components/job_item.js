import Button from './button';
export default function JobItem(props) {
    const {job, editJob, deleteJob} = props;
    return (
        <tr key={job.id}>
            <td>{job.name}</td>
            <td>
                <Button className="btn-edit" buttonTxt="Edit" onClick={() => { editJob(job.id) }} />
                <Button className="btn-delete" buttonTxt="Delete" onClick={() => { deleteJob(job.id) }} />
            </td>
        </tr>
    );
}