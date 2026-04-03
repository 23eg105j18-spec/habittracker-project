import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (isLogin) {
                const response = await api.post('/api/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                // Assuming success returns some string or token like 'Login successful'
                if (response.data && response.data.toLowerCase().includes('success')) {
                    // Save user info or token if available, here we just save email for reference
                    localStorage.setItem('userEmail', formData.email);
                    navigate('/dashboard');
                } else {
                    setError(response.data || 'Login failed.');
                }
            } else {
                const response = await api.post('/api/auth/register', formData);
                if (response.data && response.data.toLowerCase().includes('success')) {
                    setSuccessMessage('Registration successful! Please login.');
                    setIsLogin(true); // Switch to login view
                    setFormData({ name: '', email: '', password: '' });
                } else {
                    setError(response.data || 'Registration failed.');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p>{isLogin ? 'Login to continue your streak!' : 'Join us and start tracking your habits today.'}</p>
                </div>

                {error && <div className="alert error">{error}</div>}
                {successMessage && <div className="alert success">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="input-group">
                            <UserIcon className="input-icon" size={20} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? (
                            <Loader className="spinner" size={20} />
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Sign Up'}
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? 'Register now' : 'Login here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
