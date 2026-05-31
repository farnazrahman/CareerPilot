import { useState } from "react";

function JobsPage({ jobs, onSearchJobs, onComputeFitScore }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchJobs(query);
    };

    return (
        <section>
            <h2>Job Hunter</h2>
            <p>
                Search for jobs and see simple fit scores based on your CV skills.
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
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </form>

            {jobs.length === 0 && <p>No jobs found for this search.</p>}

            <div>
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        style={{
                            border: "1px solid #cccccc",
                            borderRadius: "4px",
                            padding: "12px",
                            marginBottom: "8px",
                        }}
                    >
                        <h3>
                            {job.title} – {job.company}
                        </h3>
                        <p>
                            Location: {job.location} | Salary: {job.salaryRange} | Deadline:{" "}
                            {job.deadline}
                        </p>
                        <p>
                            Skills required:{" "}
                            {job.skillsRequired && job.skillsRequired.join(", ")}
                        </p>
                        <button
                            onClick={() => onComputeFitScore(job)}
                            style={{
                                padding: "6px 12px",
                                backgroundColor: "#388e3c",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Compute Fit Score
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default JobsPage;