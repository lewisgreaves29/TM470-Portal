import React, { useState } from 'react';
import { observer } from "mobx-react-lite"
import { useNavigate, useLocation } from 'react-router-dom';  
import '../../styles/FallBackUrls.css';
import '../../styles/Shared.css';
import { globalStore } from '../../GlobalStore';

const FallBackUrls = observer(() => {

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
    const [showNewExcludedlUrlForm, setShowNewExcludedlUrlForm] = useState(false);
    const [showEditExcludedlUrlForm, setShowEditExcludedlUrlForm] = useState(false);
    const [showEditFallBackUrlForm, setShowEditFallBacklUrlForm] = useState(false);

    // Item States
    const [newExcludedUrl, setNewExcludedUrl] = useState('');
    const [selectedExcludedUrlItem, setSelectedExcludedUrlItem] = useState(null);
    const [selectedFallBackUrlItem, setSelectedFallBackUrlItem] = useState(null);

    // Excluded Url Buttons
    const handleNewExclusion = () => {
        setShowNewExcludedlUrlForm(true);
    };

    const handleNewExcludedUrlSubmit = (event) => {
        event.preventDefault();
        console.log("New Excluded URL:", newExcludedUrl);
        globalStore.addExcludedUrl(newExcludedUrl)
        setNewExcludedUrl('');
        setShowNewExcludedlUrlForm(false);
    };

    const handleExcludedUrlEdit = (item) => {
        console.log("Current Url:", item);
        setSelectedExcludedUrlItem(item);
        setShowEditExcludedlUrlForm(true);
    };

    const handleEditExcludedUrlSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Excluded URL:", selectedExcludedUrlItem);
        globalStore.editExcludedUrlById(selectedExcludedUrlItem)
        setSelectedExcludedUrlItem('');
        setShowEditExcludedlUrlForm(false);
    };

    const handleExcludedUrlDelete = (id) => {
        globalStore.deleteExcludedUrlById(id)

    };

    // Fallback Url Buttons
    const handleFallbackUrlEdit = (item) => {
        console.log("Current fallback Url:", item);
        setSelectedFallBackUrlItem(item);
        setShowEditFallBacklUrlForm(true);
    };

    const handleEditFallbackUrlSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Fallback URL:", selectedFallBackUrlItem);
        globalStore.editFallbackUrlById(selectedFallBackUrlItem)
        setSelectedFallBackUrlItem('');
        setShowEditFallBacklUrlForm(false);
    };

 
    return (
        <div className="fallback-urls-container">
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
                <h1 className="page-title">Fall Back Urls</h1>

                <button onClick={() => handleNewExclusion()}>New Exclusion</button>
                <div className="table-wrapper">
                    {/* First table */}
                    <div className="main-table">

                        <table>
                            <thead>
                                <tr>
                                    <th>Excluded URL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {globalStore.urlExclusions.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.excludedUrl}</td>
                                        <td>
                                            <button onClick={() => handleExcludedUrlEdit(item)}>Edit</button>
                                            <button onClick={() => handleExcludedUrlDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Second table */}
                    <div className="secondary-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fallback URL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr key={globalStore.fallBackUrls.id}>
                                        <td>{globalStore.fallBackUrls.fallBackUrl}</td>
                                        <td>
                                            <button onClick={() => handleFallbackUrlEdit(globalStore.fallBackUrls)}>Edit</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showNewExcludedlUrlForm && (
                <div className="popup-form">
                    <form onSubmit={handleNewExcludedUrlSubmit}>
                        <label>
                            Excluded URL:
                            <input
                                type="text"
                                value={newExcludedUrl}
                                required
                                onChange={(e) => setNewExcludedUrl(e.target.value)}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            {showEditExcludedlUrlForm && (
                <div className="popup-form">
                    <form onSubmit={handleEditExcludedUrlSubmit}>
                        <label>
                            Excluded URL:
                            <input
                                type="text"
                                value={selectedExcludedUrlItem.excludedUrl}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedExcludedUrlItem, excludedUrl: e.target.value };
                                    setSelectedExcludedUrlItem(updatedItem);
                                }}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            {showEditFallBackUrlForm && (
                <div className="popup-form">
                    <form onSubmit={handleEditFallbackUrlSubmit}>
                        <label>
                            Fallback URL:
                            <input
                                type="text"
                                value={selectedFallBackUrlItem.fallBackUrl}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedFallBackUrlItem, fallBackUrl: e.target.value };
                                    setSelectedFallBackUrlItem(updatedItem);
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
export default FallBackUrls;