import { useState } from "react";
import "./App.css";
import NavTabs from "./NavTabs.jsx";
import ProfilePage from "./ProfilePage.jsx";
import JobsPage from "./JobsPage.jsx";
import TrackerPage from "./TrackerPage.jsx";
import initialJobs from "./dummyJobs.js";

function App() {
    const [activeTab, setActiveTab] = useState("profile");
    const [cvText, setCvText] = useState("");
    const [cvId, setCvId] = useState("");
    const [jobs, setJobs] = useState(initialJobs);
    const [applications, setApplications] = useState([]);
    const [saveMessage, setSaveMessage] = useState("");

    const handleSaveProfile = () => {
        if (!cvText.trim()) {
            alert("Please paste your CV text before saving.");
            return;
        }

        console.log("Saved CV text:", cvText);
        setSaveMessage("Profile saved.");
    };

    const handleAddApplication = (newApp) => {
        setApplications((prev) => [
            ...prev,
            { ...newApp, id: prev.length + 1 },
        ]);
    };

    const handleSearchJobs = (query) => {
        const q = query.toLowerCase();
        const filtered = initialJobs.filter(
            (job) =>
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q) ||
                job.location.toLowerCase().includes(q)
        );
        setJobs(filtered);
    };

    const handleComputeFitScore = (job) => {
        if (!cvText.trim()) {
            alert("Please paste and save your CV in the Profile tab first.");
            return;
        }

        const cvLower = cvText.toLowerCase();
        const skills = job.skillsRequired || [];
        let matched = 0;

        skills.forEach((skill) => {
            if (cvLower.includes(skill.toLowerCase())) {
                matched += 1;
            }
        });

        const score =
            skills.length === 0 ? 0 : Math.round((matched / skills.length) * 100);

        alert(
            `Fit score for "${job.title}" at "${job.company}" is ${score}%. ` +
            `Matched ${matched} out of ${skills.length} skills.`
        );
    };

    return (
        <div className="app-container">
            <div style={{ fontFamily: "sans-serif", padding: "16px" }}>
                <header style={{ marginBottom: "16px" }}>
                    <h1>CareerPilot</h1>
                    <p>
                        Plan your career, track applications, and stay organized in one
                        place.
                    </p>
                </header>

                <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <main style={{ marginTop: "16px" }}>
                    {activeTab === "profile" && (
                        <>
                            <ProfilePage
                                cvText={cvText}
                                setCvText={setCvText}
                                onSaveProfile={handleSaveProfile}
                                cvId={cvId}
                                setCvId={setCvId}
                            />
                            {saveMessage && (
                                <p style={{ marginTop: "8px", color: "green" }}>
                                    {saveMessage}
                                </p>
                            )}
                        </>
                    )}

                    {activeTab === "jobs" && (
                        <JobsPage
                            jobs={jobs}
                            onSearchJobs={handleSearchJobs}
                            onComputeFitScore={handleComputeFitScore}
                            cvId={cvId}
                        />
                    )}

                    {activeTab === "tracker" && (
                        <TrackerPage
                            jobs={jobs}
                            applications={applications}
                            onAddApplication={handleAddApplication}
                            cvId={cvId}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;