import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Auth/register';
import Login from './components/Auth/login';
import HomePage from './pages/home';
import RecommendationsPage from './pages/recommendations';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/home"
                        element={
                                <HomePage />
                        }
                    />
                    <Route
                        path="/recommendations"
                        element={
                                <RecommendationsPage />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
