'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../../lib/auth';
import styles from './page.module.css';

export default function SignupLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // LOGIN REQUEST TO BACKEND
        console.log('Sending login request to backend...');
        const result = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (result && result.success) {
          console.log('Login successful:', result.data);
          // Redirect to home page after successful login
          router.push('/home');
        } else if (result) {
          setError(result.data.message || 'Login failed');
          console.error('Login failed:', result.data);
        } else {
          setError('Login failed - no response from server');
        }
      } else {
        // SIGNUP REQUEST TO BACKEND
        console.log('Sending signup request to backend...');
        const result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (result && result.success) {
          console.log('Signup successful:', result.data);
          // Redirect to home page after successful registration
          router.push('/home');
        } else if (result) {
          setError(result.data.message || 'Registration failed');
          console.error('Signup failed:', result.data);
        } else {
          setError('Registration failed - no response from server');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(''); // Clear any previous errors
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <div className={styles.toggleSection}>
          <span className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={toggleMode}
            className={styles.toggleButton}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
} 