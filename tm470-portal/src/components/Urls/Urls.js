import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import '../../styles/Urls.css';
import '../../styles/Shared.css';
import { globalStore } from '../../GlobalStore';
import { observer } from "mobx-react-lite"

const Urls = observer( () => {
    // Navigation Bar Settings
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleNavClick = (path) => {
        navigate(path);
    };

    const toggleSettings = () => {
        setIsSettingsExpanded(!isSettingsExpanded);
    };

    //Show Forms
    const [showNewSinglelUrlForm, setShowNewSinglelUrlForm] = useState(false);
    const [showNewIntelligentlUrlForm, setShowNewIntelligentlUrlForm] = useState(false);

    // Item States
    const [newSingleUrl, setNewSingleUrl] = useState('');
    const [newIntelligentUrl, setNewIntelligentUrl] = useState(null);
    

    const handleSingleUrl = (id) => {
        setShowNewSinglelUrlForm(true);
    };

    const handleSingleUrlSubmit = (event) => {
        event.preventDefault();
        globalStore.addExcludedUrl(newSingleUrl)
        setNewSingleUrl('');
        setShowNewSinglelUrlForm(false);
    };


    const handleIntelligentUrl = (id) => {
        setShowNewIntelligentlUrlForm(true);
    };

    const handleIntelligentUrlSubmit = (id) => {
        // Handle delete logic here
        console.log(`Deleting item with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log(`Deleting item with id: ${id}`);
    };

    return (
        <div className="urls-container">
            <nav className="sidebar-menu">
            <img src="/logo.png" alt="Logo" className="logo" />
            <ul>
                    <li 
                        onClick={() => handleNavClick('/accounts')} 
                        className={location.pathname === '/accounts' ? 'active' : ''}
                    >
                        Accounts
                    </li>
                    <li onClick={toggleSettings}>
                        Settings
                        {isSettingsExpanded && (
                            <ul>
                                <li onClick={() => handleNavClick('/fallbackurls')}>FallBackUrls</li>
                                <li onClick={() => handleNavClick('/customdomains')}>Custom Domains</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleNavClick('/urls')}>Urls</li>
                    <li onClick={() => handleNavClick('/helpdocs')}>Help Docs</li>
                </ul>
            </nav>
            <div className="content">
                <h1 className="page-title">URLS</h1>
                <button onClick={() => handleSingleUrl()}>Single URL </button>
                <button onClick={() => handleIntelligentUrl()}>Intelligent URL</button>
                <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Shortened URL</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {globalStore.urls.map(item => (
                        <tr key={item.id}>
                            <td>{item.originalUrl}</td>
                            <td>{item.shortenedUrl}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </div>
            {showNewSinglelUrlForm && (
                <div className="popup-form">
                    <form onSubmit={handleSingleUrlSubmit}>
                        <label>
                            Single URL:
                            <input
                                type="text"
                                value=""
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...newSingleUrl, originalUrl: e.target.value };
                                    setNewSingleUrl(updatedItem);
                                }}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            </div>
    );
})

export default Urls;