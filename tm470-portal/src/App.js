import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Accounts from './components/Accounts/Accounts';
import FallBackUrls from './components/FallBackUrls/FallBackUrls';
import CustomDomains from './components/CustomDomains/CustomDomains';
import Urls from './components/Urls/Urls';
import HelpDocs from './components/HelpDocs/HelpDocs';  // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/fallbackurls" element={<FallBackUrls />} />
        <Route path="/customdomains" element={<CustomDomains />} />
        <Route path="/urls" element={<Urls />} />
        <Route path="/helpdocs" element={<HelpDocs />} />  {/* Add the new route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;