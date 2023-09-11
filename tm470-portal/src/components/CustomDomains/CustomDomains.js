import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import the useLocation hook
import '../../styles/CustomDomains.css';
import '../../styles/Shared.css';
import { globalStore } from '../../GlobalStore';
import { observer } from "mobx-react-lite"


const CustomDomains = observer( () => {

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
    const [showNewCustomDomainForm, setShowNewECustomDomainForm] = useState(false);
    const [showEditCustomDomainForm, setShowEditCustomDomainForm] = useState(false);

    // Item States
    const [newCustomDomain, setNewCustomDomain] = useState('');
    const [selectedCustomDomainItem, setSelectedCustomDomainItem] = useState(null);

    const handleCustomDomainVerify = (id) => {
        // Handle edit logic here
        console.log(`Editing item with id: ${id}`);
    };

    const handleCustomDomainEdit = (item) => {
        console.log("Current Url:", item);
        setSelectedCustomDomainItem(item);
        setShowEditCustomDomainForm(true);
    };

    const handleCustomDomainEditSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Custom Domain:", selectedCustomDomainItem);
        globalStore.editCustomDomainById(selectedCustomDomainItem)
        setSelectedCustomDomainItem('');
        setShowEditCustomDomainForm(false);
    };

    const handleCustomDomainDelete = (id) => {
        globalStore.deleteCustomDomainById(id)
    };
    
    const handleNewCustomDomain = () => {
        setShowNewECustomDomainForm(true);
    };

    const handleNewCustomDomainSubmit = (event) => {
        event.preventDefault();
        console.log("New Custom domain:", newCustomDomain);
        globalStore.addCustomDomain(newCustomDomain)
        setNewCustomDomain('');
        setShowNewECustomDomainForm(false);
    };

    return (
        <div className="custom-domains-container">
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
                <h1 className="page-title">Custom Domains</h1>
                <button onClick={() => handleNewCustomDomain()}>New Domain</button>
                <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Custom Domain</th>
                        <th>Verification Key</th>
                        <th>Default</th>
                        <th>Verification Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={globalStore.customDomains.id}>
                            <td>{globalStore.customDomains.domain}</td>
                            <td>{globalStore.customDomains.verificationCode}</td>
                            <td>True</td>
                            <td>{globalStore.customDomains.validated}</td>

                            <td>
                                <button onClick={() => handleCustomDomainVerify(globalStore.customDomains.id)}>Verify</button>
                                <button onClick={() => handleCustomDomainEdit(globalStore.customDomains)}>Edit</button>
                                <button onClick={() => handleCustomDomainDelete(globalStore.customDomains.id)}>Delete</button>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
            </div>
            {showNewCustomDomainForm && (
            <div className="popup-form">
                <form onSubmit={handleNewCustomDomainSubmit}>
                    <label>
                        Custom Domain:
                        <input
                            type="text"
                            value={newCustomDomain}
                            required
                            onChange={(e) => newCustomDomain(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )}
        {showEditCustomDomainForm && (
            <div className="popup-form">
                <form onSubmit={handleCustomDomainEditSubmit}>
                    <label>
                        Custom Domain:
                        <input
                            type="text"
                            value={selectedCustomDomainItem.domain}
                            required
                            onChange={(e) => {
                                const updatedItem = { ...selectedCustomDomainItem, domain: e.target.value };
                                setSelectedCustomDomainItem(updatedItem);
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

export default CustomDomains;