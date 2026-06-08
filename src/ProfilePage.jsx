import { useState } from "react";
import { uploadCV } from "./api/api";

function ProfilePage({
                         cvText,
                         setCvText,
                         onSaveProfile,
                         cvId,
                         setCvId,
                     }) {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setSelectedFileName(file.name);

        const validTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!validTypes.includes(file.type)) {
            setUploadStatus("❌ Please upload a PDF or DOCX file.");
            return;
        }

        setUploading(true);
        setUploadStatus("Uploading and processing CV...");

        try {
            const response = await uploadCV(file);

            setCvId(response.cv_id);
            setUploadStatus("✅ CV uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("❌ Failed to upload CV. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <section>
            <h2>Profile</h2>

            <div
                style={{
                    marginBottom: "24px",
                    padding: "16px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                }}
            >
                <h3>Upload CV</h3>
                <p>Upload your CV as a PDF or DOCX file so the backend can process it.</p>

                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    style={{
                        marginTop: "8px",
                        padding: "8px",
                    }}
                />

                {selectedFileName && (
                    <p style={{ marginTop: "8px" }}>
                        <strong>Selected file:</strong> {selectedFileName}
                    </p>
                )}

                {uploadStatus && (
                    <p
                        style={{
                            marginTop: "8px",
                            fontWeight: "bold",
                            color: uploadStatus.startsWith("✅")
                                ? "green"
                                : uploadStatus.startsWith("❌")
                                    ? "red"
                                    : "#333",
                        }}
                    >
                        {uploadStatus}
                    </p>
                )}

                {cvId && (
                    <p style={{ marginTop: "8px", color: "#1976d2" }}>
                        CV processed successfully. CV ID: {cvId}
                    </p>
                )}
            </div>

            <div
                style={{
                    padding: "16px",
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",
                }}
            >
                <h3>Or Paste CV Text</h3>
                <p>
                    This is a temporary fallback for your frontend. It saves only in the
                    browser unless you later connect this text area to the backend too.
                </p>

                <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    rows={12}
                    placeholder="Paste your CV or write a short summary..."
                    style={{
                        width: "100%",
                        marginTop: "8px",
                        padding: "8px",
                        fontFamily: "monospace",
                    }}
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
            </div>
        </section>
    );
}

export default ProfilePage;