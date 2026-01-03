import React, { useState } from 'react';
import './PersonaForm.css';

export default function PersonaForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    role: '',
    tone: 'Thought Leader',
    topics: '',
    style: 'Storytelling'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="glass-panel persona-container">
      <h2>Define Your Persona</h2>
      <p className="subtitle">Teach the AI how to sound like you.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Professional Role</label>
          <input 
            type="text" 
            name="role" 
            placeholder="e.g. Senior Product Manager" 
            value={formData.role} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tone of Voice</label>
            <select name="tone" value={formData.tone} onChange={handleChange}>
              <option>Thought Leader</option>
              <option>Casual & Friendly</option>
              <option>Formal & Professional</option>
              <option>Controversial/Bold</option>
              <option>Educational</option>
            </select>
          </div>

          <div className="form-group">
            <label>Writing Style</label>
            <select name="style" value={formData.style} onChange={handleChange}>
              <option>Storytelling</option>
              <option>Bullet Points</option>
              <option>Analytical</option>
              <option>Short & Punchy</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Key Topics (comma separated)</label>
          <input 
            type="text" 
            name="topics" 
            placeholder="e.g. AI, Leadership, Remote Work" 
            value={formData.topics} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="btn-primary">Save Persona</button>
      </form>
    </div>
  );
}
