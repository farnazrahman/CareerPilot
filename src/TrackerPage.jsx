import { useState } from "react";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];

function TrackerPage({ jobs, applications, onAddApplication }) {
    const [selectedJobId, setSelectedJobId] = useState("");
    const [status, setStatus] = useState("Applied");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedJobId) {
            alert("Please select a job.");
            return;
        }
        const job = jobs.find((j) => j.id === Number(selectedJobId));
        if (!job) {
            alert("Selected job not found.");
            return;
        }
        onAddApplication({
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            status,
        });
        setSelectedJobId("");
        setStatus("Applied");
    };

    const appsByStatus = (s) =>
        applications.filter((app) => app.status === s);

    return (
        <section>
            <h2>Application Tracker</h2>
            <p>
                Track applications by status. Later you can sync this with backend and calendar.
            </p>

            <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
                <label>
                    Job:
                    <select
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                        style={{ marginLeft: "8px", marginRight: "16px" }}
                    >
                        <option value="">Select a job</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.title} – {job.company}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ marginLeft: "8px", marginRight: "16px" }}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="submit"
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Add Application
                </button>
            </form>

            <div style={{ display: "flex", gap: "16px" }}>
                {STATUSES.map((s) => (
                    <div
                        key={s}
                        style={{
                            flex: 1,
                            border: "1px solid #cccccc",
                            borderRadius: "4px",
                            padding: "8px",
                        }}
                    >
                        <h3>{s}</h3>
                        {appsByStatus(s).length === 0 && (
                            <p style={{ fontSize: "0.9rem", color: "#777777" }}>
                                No applications.
                            </p>
                        )}
                        {appsByStatus(s).map((app) => (
                            <div
                                key={app.id}
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "4px",
                                    padding: "6px",
                                    marginBottom: "4px",
                                    fontSize: "0.9rem",
                                }}
                            >
                                <strong>{app.jobTitle}</strong>
                                <br />
                                <span>{app.company}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TrackerPage;