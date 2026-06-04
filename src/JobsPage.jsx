import { useState } from "react";
import { huntJobs } from './api/api';

function JobsPage({ jobs, onSearchJobs, onComputeFitScore }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [backendJobs, setBackendJobs] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cvId = localStorage.getItem('cv_id');

        if (!cvId) {
            alert('Please upload your CV first in the Profile page!');
            return;
        }

        setLoading(true);

        try {
            const response = await huntJobs(query, cvId);
            console.log('Jobs from backend:', response);
            setBackendJobs(response.jobs);
        } catch (error) {
            console.error('Job search error:', error);
            alert('Failed to search jobs. Make sure the backend is running!');
        } finally {
            setLoading(false);
        }
    };

    const displayJobs = backendJobs.length > 0 ? backendJobs : jobs;

    return (
        <section>
            <h2>Job Hunter</h2>
            <p>
                Search for jobs and see AI-powered fit scores based on your CV.
            </p>

            <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. ML intern in Dhaka"
                    style={{ padding: "8px", width: "60%", marginRight: "8px" }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: loading ? "#cccccc" : "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {displayJobs.length === 0 && !loading && <p>No jobs found. Try searching!</p>}

            {loading && <p>🔍 Searching for jobs...</p>}

            <div>
                {backendJobs.length > 0 ? (
                    backendJobs.map((job, index) => (
                        <div
                            key={index}
                            style={{
                                border: "2px solid #1976d2",
                                borderRadius: "8px",
                                padding: "16px",
                                marginBottom: "12px",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            <h3>
                                {job.role} – {job.company}
                            </h3>
                            <p>
                                📍 Location: {job.location} | 💰 Salary: {job.salary_range || 'N/A'} | 📅 Deadline: {job.deadline || 'N/A'}
                            </p>
                            <p>
                                <strong>Fit Score:</strong> {job.fit_score}/100
                            </p>
                            <p>
                                <strong>Why this fits:</strong> {job.reasoning}
                            </p>
                        </div>
                    ))
                ) : (
                    jobs.map((job, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "12px",
                                marginBottom: "8px",
                            }}
                        >
                            <h4>{job.title}</h4>
                            <p>{job.company}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default JobsPage;