import React, { useState } from 'react';
import './PostGenerator.css';

export default function PostGenerator({ persona }) {
    const [topic, setTopic] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

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
        if (!generatedContent && !selectedImage) return;
        setIsPosting(true);

        try {
            // In a real app, we would use FormData to send the file
            // const formData = new FormData();
            // formData.append('content', generatedContent);
            // if (selectedImage) formData.append('image', selectedImage);

            // For simulation, we just send JSON
            const response = await fetch('http://localhost:5000/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: generatedContent,
                    hasImage: !!selectedImage
                })
            });

            const data = await response.json();
            if (data.success) {
                alert('Successfully posted to LinkedIn! (Simulated)');
                // Reset state after success
                setGeneratedContent('');
                setTopic('');
                removeImage();
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
                    placeholder="What do you want to talk about today?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows="3"
                />

                <div className="controls-row">
                    <div className="image-upload-wrapper">
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden-file-input"
                        />
                        <label htmlFor="imageInput" className="btn-secondary btn-icon">
                            📸 Add Image
                        </label>
                    </div>

                    <button
                        className="btn-primary generate-btn"
                        onClick={handleGenerate}
                        disabled={isGenerating || !topic}
                    >
                        {isGenerating ? '✨ Magic happening...' : '✨ Generate Post'}
                    </button>
                </div>
            </div>

            {(generatedContent || imagePreview) && (
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
                            {generatedContent && generatedContent.split('\n').map((line, i) => (
                                <p key={i}>{line || <br />}</p>
                            ))}
                        </div>
                        {imagePreview && (
                            <div className="preview-image-container">
                                <img src={imagePreview} alt="Post attachment" className="preview-image" />
                                <button className="remove-image-btn" onClick={removeImage}>×</button>
                            </div>
                        )}
                    </div>

                    <div className="actions">
                        <button className="btn-secondary" onClick={() => { setGeneratedContent(''); removeImage(); }}>Discard</button>
                        <button className="btn-primary" onClick={handlePost} disabled={isPosting}>
                            {isPosting ? 'Posting...' : '🚀 Post to LinkedIn'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
