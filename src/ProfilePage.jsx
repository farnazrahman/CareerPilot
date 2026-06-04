import { uploadCV } from './api/api';
import { useState } from 'react';

function ProfilePage({ cvText, setCvText, onSaveProfile }) {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        // Check file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF or DOCX file');
            return;
        }

        setUploading(true);
        setUploadStatus('Uploading...');

        try {
            const response = await uploadCV(file);
            console.log('CV uploaded!', response);

            // Save cv_id for later use
            localStorage.setItem('cv_id', response.cv_id);

            setUploadStatus('✅ CV uploaded successfully!');
            alert('CV uploaded and processed successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('❌ Failed to upload CV');
            alert('Failed to upload CV. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section>
            <h2>Profile</h2>

            {/* File Upload Section */}
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h3>Upload CV (PDF or DOCX)</h3>
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    style={{
                        padding: "8px",
                        marginTop: "8px",
                    }}
                />
                {uploadStatus && (
                    <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
                        {uploadStatus}
                    </p>
                )}
            </div>

            {/* Text Paste Section (Optional/Fallback) */}
            <div>
                <h3>Or Paste CV Text</h3>
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
            </div>
        </section>
    );
}

export default ProfilePage;;