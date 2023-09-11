import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import { useNavigate, useLocation } from 'react-router-dom';  // Import the useLocation hook
import '../../styles/Accounts.css';
import '../../styles/Shared.css';
import { globalStore } from '../../GlobalStore';


const Accounts = observer( () => {

    // Navigation Bar Settings
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        async function fetchAccount() {
            await globalStore.getAccount();
        }
        
        fetchAccount();
    }, []);

    const handleNavClick = (path) => {
        navigate(path);
    };

    const toggleSettings = () => {
        setIsSettingsExpanded(!isSettingsExpanded);
    };

    //Show Forms
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [showApi, setShowApi] = useState(false);
    const [showChangeEmail, setChangeEmailForm] = useState(false);
    // Item States
    const [newUser, setNewUser] = useState('');
    const [selectedUserItem, setSelectedUserItem] = useState(null);
    const [selectedChangeEmailItem, setSelectedChangeEmailItem] = useState(null);
    const [selectedPasswordResetItem, setSelectedPasswordResetItem] = useState(null);

    const handleNewUser = () => {
        setShowNewUserForm(true);
    };

    const handleNewUserSubmit = (event) => {
        event.preventDefault();
        console.log("New User:", newUser);
        globalStore.addUser(newUser)
        setNewUser('');
        setShowNewUserForm(false);
    };

    const handleChangeEmail = () => {
        setChangeEmailForm(true);
    };

    const handleChangeEmailSubmit = (event) => {
        event.preventDefault();
        console.log("New Email:", selectedChangeEmailItem);
        globalStore.updateAccountEmailById(selectedChangeEmailItem)
        setSelectedChangeEmailItem('');
        setChangeEmailForm(false);
    };

    const handleShowApiKey = (id) => {
        setShowApi(true);
    };

    const handleUserEdit = (item) => {
        console.log("Current user:", item);
        setSelectedUserItem(item);
        setShowEditUserForm(true);
    };

    const handleEditUserSubmit = (event) => {
        event.preventDefault();
        console.log("Updated User:", selectedUserItem);
        globalStore.editUserById(selectedUserItem)
        setSelectedUserItem('');
        setShowEditUserForm(false);
    };

    const handlePasswordReset = (item) => {
        setSelectedPasswordResetItem(item);
        setShowPasswordResetForm(true);
    };

    const handlePasswordResetSubmit = (event) => {
        event.preventDefault();
        globalStore.editUserById(selectedPasswordResetItem)
        setSelectedPasswordResetItem('');
        setShowPasswordResetForm(false);
    };

    const handleDelete = (id) => {
        globalStore.deleteUser(id)
    };


    return (
        <div className="accounts-container">
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
                <h1 className="page-title">Accounts</h1>
                <button onClick={() => handleNewUser()}>New User</button>
                <button onClick={() => handleChangeEmail()}>Change Email</button>
                <button onClick={() => handleShowApiKey()}>Show API Key</button>
                <button onClick={() => handleDelete()}>Delete Account</button>
                <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {globalStore.users.map(item => (
                        <tr key={item.id}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.emailAddress}</td>
                            <td>
                                <button onClick={() => handlePasswordReset(item)}>Reset Password</button>
                                <button onClick={() => handleUserEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </div>
        {showEditUserForm && (
                <div className="popup-form">
                    <form onSubmit={handleEditUserSubmit}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={selectedUserItem.firstName}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedUserItem, firstName: e.target.value };
                                    setSelectedUserItem(updatedItem);
                                }}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={selectedUserItem.lastName}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedUserItem, lastName: e.target.value };
                                    setSelectedUserItem(updatedItem);
                                }}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                value={selectedUserItem.emailAddress}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedUserItem, emailAddress: e.target.value };
                                    setSelectedUserItem(updatedItem);
                                }}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
        )}
        {showNewUserForm && (
                <div className="popup-form">
                    <form onSubmit={handleNewUserSubmit}>
                        <label>
                            First Name
                            <input
                                type="text"
                                value={newUser.firstName}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...newUser, firstName: e.target.value };
                                    setNewUser(updatedItem);
                                }}
                            />
                        </label>
                        <label>
                            Last Name
                            <input
                                type="text"
                                value={newUser.lastName}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...newUser, lastName: e.target.value };
                                    setNewUser(updatedItem);
                                }}
                            />
                        </label>
                        <label>
                            Email Address
                            <input
                                type="text"
                                value={newUser.emailAddress}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...newUser, emailAddress: e.target.value };
                                    setNewUser(updatedItem);
                                }}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="text"
                                value={newUser.userPassword}
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...newUser, userPassword: e.target.value };
                                    setNewUser(updatedItem);
                                }}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            {showApi && (
                <div className="popup-form">
                <div>{globalStore.account.apiKey}</div>
                </div>
            )}
            {showChangeEmail && (
                <div className="popup-form">
                <form onSubmit={handleChangeEmailSubmit}>
                    <label>
                        Email Address:
                        <input
                            type="text"
                            value={selectedChangeEmailItem.emailAddress}
                            required
                            onChange={(e) => {
                                const updatedItem = { ...selectedChangeEmailItem, emailAddress: e.target.value };
                                setSelectedChangeEmailItem(updatedItem);
                            }}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            )}
            {showPasswordResetForm && (
                <div className="popup-form">
                    <form onSubmit={handlePasswordResetSubmit}>
                        <label>
                            Password:
                            <input
                                type="text"
                                value=""
                                required
                                onChange={(e) => {
                                    const updatedItem = { ...selectedPasswordResetItem, password: e.target.value };
                                    setSelectedPasswordResetItem(updatedItem);
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

export default Accounts;