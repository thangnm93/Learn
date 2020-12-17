const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

export const loadJobs = async () => {
    const res = await fetch(apiUrl);
    return await res.json();
}

export const createJob = async (job) => {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    });
    return await res.json();
}

export const getJob = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`);
    return await res.json();
}

export const updateJob = async (id, job) => {
    const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    });
    return await res.json();
}

export const deleteJob = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`, {method: 'DELETE'});
    return await res.json();
}