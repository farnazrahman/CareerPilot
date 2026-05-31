function ProfilePage({ cvText, setCvText, onSaveProfile }) {
    return (
        <section>
            <h2>Profile</h2>
            <p>
                Paste your CV text here. For now, this stays only in the browser,
                later you can send it to the backend.
            </p>

            <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                rows={12}
                style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "8px",
                    fontFamily: "monospace",
                }}
                placeholder="Paste your CV or write a short summary..."
            />

            <div style={{ marginTop: "8px" }}>
                <button
                    onClick={onSaveProfile}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Save Profile
                </button>
            </div>
        </section>
    );
}

export default ProfilePage;