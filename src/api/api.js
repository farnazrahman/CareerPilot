const API_URL = "http://localhost:8000";

export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_URL}/upload-cv`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload CV');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading CV:', error);
        throw error;
    }
};

export const huntJobs = async (query, cvId) => {
    try {
        const response = await fetch(`${API_URL}/hunt-jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                cv_id: cvId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to hunt jobs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error hunting jobs:', error);
        throw error;
    }
};

export const chatWithAssistant = async (message, cvId) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                cv_id: cvId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to chat with assistant');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error chatting:', error);
        throw error;
    }
};