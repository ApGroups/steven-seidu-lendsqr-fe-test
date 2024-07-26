import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage'; 
import UserDetails from './pages/UserDetails'; 
import DashBoard from './pages/Dashboard';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/DashBoard" element={<DashBoard />} />
                <Route path="/UserPage" element={<UserPage />} />
                <Route path="/UserDetails" element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
