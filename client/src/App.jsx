import React, { useState, useEffect } from 'react';
import PersonaForm from './components/PersonaForm';
import PostGenerator from './components/PostGenerator';
import ConnectLinkedIn from './components/ConnectLinkedIn';
import './App.css';

function App() {
  const [persona, setPersona] = useState(null);
  const [userAccount, setUserAccount] = useState(null);

  useEffect(() => {
    const savedPersona = localStorage.getItem('linkedin_persona');
    const savedAccount = localStorage.getItem('linkedin_account');

    if (savedPersona) setPersona(JSON.parse(savedPersona));
    if (savedAccount) setUserAccount(JSON.parse(savedAccount));
  }, []);

  const handleSavePersona = (data) => {
    setPersona(data);
    localStorage.setItem('linkedin_persona', JSON.stringify(data));
  };

  const handleClearPersona = () => {
    setPersona(null);
    localStorage.removeItem('linkedin_persona');
  };

  const handleConnectAccount = (account) => {
    setUserAccount(account);
    localStorage.setItem('linkedin_account', JSON.stringify(account));
  };

  const handleDisconnect = () => {
    setUserAccount(null);
    localStorage.removeItem('linkedin_account');
  };

  return (
    <div className="app-container">
      <div className="demo-badge">RUNNING IN DEMO MODE</div>
      <header className="main-header">
        <div className="logo">Linkin<span className="dot">.</span>AI</div>
        <div className="header-actions">
          {userAccount && (
            <div className="connected-badge" onClick={handleDisconnect} title="Click to disconnect">
              <span className="dot-indicator"></span>
              {userAccount.name || 'Connected'}
            </div>
          )}
          {persona && (
            <button className="btn-small" onClick={handleClearPersona}>
              Edit Persona
            </button>
          )}
        </div>
      </header>

      <main>
        {!userAccount ? (
          <ConnectLinkedIn onConnect={handleConnectAccount} />
        ) : !persona ? (
          <PersonaForm onSave={handleSavePersona} />
        ) : (
          <PostGenerator persona={persona} />
        )}
      </main>
    </div>
  );
}

export default App;
