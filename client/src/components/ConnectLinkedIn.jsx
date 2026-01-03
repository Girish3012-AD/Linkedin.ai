import React, { useState } from 'react';
import './ConnectLinkedIn.css';

export default function ConnectLinkedIn({ onConnect }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = () => {
        setIsLoading(true);
        // In a real app, this redirects to LinkedIn OAuth URL
        // window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=...';

        setTimeout(() => {
            // Simulating a successful login for the demo
            setIsLoading(false);
            onConnect({
                name: "User Name",
                avatar: "",
                connected: true
            });
        }, 1500);
    };

    return (
        <div className="glass-panel connect-container">
            <div className="linkedin-logo">
                <span>in</span>
            </div>
            <h2>Connect Your Profile</h2>
            <p className="subtitle">
                To automate posts, you need to authorize this app to publish on your behalf.
            </p>

            <div className="security-note">
                <span className="icon">🔒</span>
                <p>Your credentials are secure. We only request permission to <strong>share content</strong>.</p>
            </div>

            <button className="btn-linkedin" onClick={handleConnect} disabled={isLoading}>
                {isLoading ? 'Connecting...' : 'Connect LinkedIn Account'}
            </button>

            <p className="disclaimer">
                (For this demo, clicking above simulates a successful connection)
            </p>
        </div>
    );
}
