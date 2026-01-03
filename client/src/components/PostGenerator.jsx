import React, { useState } from 'react';
import './PostGenerator.css';

export default function PostGenerator({ persona }) {
    const [topic, setTopic] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);

        try {
            const response = await fetch('http://localhost:5000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, persona })
            });
            const data = await response.json();
            setGeneratedContent(data.content);
        } catch (error) {
            console.error('Error generating post:', error);
            alert('Failed to generate post. Check server connection.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePost = async () => {
        if (!generatedContent) return;
        setIsPosting(true);

        try {
            const response = await fetch('http://localhost:5000/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: generatedContent })
            });
            const data = await response.json();
            if (data.success) {
                alert('Successfully posted to LinkedIn! (Simulated)');
            }
        } catch (error) {
            console.error('Error posting:', error);
            alert('Failed to post.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="glass-panel generator-container">
            <h2>Create New Post</h2>
            <p className="subtitle">Drafting as: <span className="highlight">{persona.role}</span></p>

            <div className="input-section">
                <textarea
                    placeholder="What do you want to talk about today? (e.g. 'The importance of taking breaks')"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows="3"
                />
                <button
                    className="btn-primary generate-btn"
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                >
                    {isGenerating ? '✨ Magic happening...' : '✨ Generate Post'}
                </button>
            </div>

            {generatedContent && (
                <div className="preview-section fade-in">
                    <h3>Preview</h3>
                    <div className="linkedin-preview">
                        <div className="preview-header">
                            <div className="avatar-placeholder"></div>
                            <div className="meta">
                                <div className="name">Your Name</div>
                                <div className="role">{persona.role}</div>
                                <div className="time">Now • <span className="globe">🌐</span></div>
                            </div>
                        </div>
                        <div className="preview-body">
                            {generatedContent.split('\n').map((line, i) => (
                                <p key={i}>{line || <br />}</p>
                            ))}
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn-secondary" onClick={() => setGeneratedContent('')}>Discard</button>
                        <button className="btn-primary" onClick={handlePost} disabled={isPosting}>
                            {isPosting ? 'Posting...' : '🚀 Post to LinkedIn'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
