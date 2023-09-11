import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import the useLocation hook
import '../../styles/HelpDocs.css';
import '../../styles/Shared.css';

const HelpDocs = () => {
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();  // Get the current location

    const handleNavClick = (path) => {
        navigate(path);
    };

    const toggleSettings = () => {
        setIsSettingsExpanded(!isSettingsExpanded);
    };
    return (
        <div className="helpdocs-container">
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
                <h1 className="page-title">Help Documents</h1>
                {/* Place your main content here */}
                Welcome to the Help Docs page!
            </div>
        </div>
    );
}

export default HelpDocs;