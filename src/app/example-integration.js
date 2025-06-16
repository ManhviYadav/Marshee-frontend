// Example integration for your existing login page
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../lib/auth';

// Example Login Component Integration
export function useAuthExample() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const result = await loginUser({ email, password });
      
      if (result.success) {
        // Redirect to home page after successful login
        router.push('/home');
      } else {
        setError(result.data.message || 'Login failed');
      }
    } catch {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    setError('');

    try {
      const result = await registerUser({ name, email, password });
      
      if (result.success) {
        // Redirect to home page after successful registration
        router.push('/home');
      } else {
        setError(result.data.message || 'Registration failed');
      }
    } catch {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    loading,
    error
  };
}

// Example usage in your signup-login page:
/*
'use client';
import { useAuthExample } from '../example-integration';

export default function SignupLoginPage() {
  const { handleLogin, handleRegister, loading, error } = useAuthExample();
  
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await handleLogin(
      formData.get('email'),
      formData.get('password')
    );
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await handleRegister(
      formData.get('name'),
      formData.get('email'),
      formData.get('password')
    );
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={onSubmitLogin}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <form onSubmit={onSubmitRegister}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
*/

// Example protected page (like shop):
/*
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, fetchShopItems } from '../lib/auth';

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signup-login');
      return;
    }

    const loadShopItems = async () => {
      const result = await fetchShopItems();
      if (result && result.success) {
        setItems(result.data.products || []);
      }
      setLoading(false);
    };

    loadShopItems();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pet Shop (Protected)</h1>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
*/ 