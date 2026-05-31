import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
      <div style={{ fontFamily: "sans-serif", padding: "16px" }}>
        <header style={{ marginBottom: "16px" }}>
          <h1>CareerPilot</h1>
          <p>Simple career co-pilot frontend for our first hackathon.</p>
        </header>

        {/* Tab buttons */}
        <nav style={{ marginBottom: "16px" }}>
          <button
              onClick={() => setActiveTab("profile")}
              style={{
                marginRight: "8px",
                padding: "8px 12px",
                backgroundColor: activeTab === "profile" ? "#1976d2" : "#eeeeee",
                color: activeTab === "profile" ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
          >
            Profile
          </button>
          <button
              onClick={() => setActiveTab("jobs")}
              style={{
                marginRight: "8px",
                padding: "8px 12px",
                backgroundColor: activeTab === "jobs" ? "#1976d2" : "#eeeeee",
                color: activeTab === "jobs" ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
          >
            Jobs
          </button>
          <button
              onClick={() => setActiveTab("tracker")}
              style={{
                padding: "8px 12px",
                backgroundColor: activeTab === "tracker" ? "#1976d2" : "#eeeeee",
                color: activeTab === "tracker" ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
          >
            Tracker
          </button>
        </nav>

        {/* Tab content */}
        <main>
          {activeTab === "profile" && (
              <section>
                <h2>Profile Page</h2>
                <p>
                  Here you will let the user (and Farnaz for testing) paste CV text
                  and save their profile.
                </p>
              </section>
          )}

          {activeTab === "jobs" && (
              <section>
                <h2>Jobs Page</h2>
                <p>
                  Here you will show job cards, search by keywords, and later call
                  the backend to fetch real jobs.
                </p>
              </section>
          )}

          {activeTab === "tracker" && (
              <section>
                <h2>Tracker Page</h2>
                <p>
                  Here you will track applications (Applied, Interviewing, Offer,
                  Rejected) in simple lists.
                </p>
              </section>
          )}
        </main>
      </div>
  );
}

export default App;