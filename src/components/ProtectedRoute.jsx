'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define which routes require authentication
  const protectedRoutes = ['/store'];
  
  // Check if current route requires authentication
  const requiresAuth = protectedRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = () => {
      // If route doesn't require auth, allow access
      if (!requiresAuth) {
        setIsAuthed(true);
        setLoading(false);
        return;
      }

      // For protected routes, check authentication
      const authenticated = isAuthenticated();
      
      if (!authenticated) {
        console.log('🔒 Access denied to protected route:', pathname);
        router.push('/signup-login');
        return;
      }

      console.log('✅ Authentication verified for protected route:', pathname);
      setIsAuthed(true);
      setLoading(false);
    };

    checkAuth();
  }, [pathname, requiresAuth, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Render children if authenticated or route is public
  return isAuthed ? children : null;
} 