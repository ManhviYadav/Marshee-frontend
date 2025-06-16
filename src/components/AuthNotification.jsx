'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated, removeToken } from '../lib/auth';

export default function AuthNotification() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) return;

    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (!tokenExpiry) return;

      const expiryTime = parseInt(tokenExpiry);
      const currentTime = Date.now();
      const timeRemaining = expiryTime - currentTime;

      // Show warning when 30 seconds left
      if (timeRemaining <= 30000 && timeRemaining > 0) {
        setTimeLeft(Math.ceil(timeRemaining / 1000));
        setShowWarning(true);
      } else if (timeRemaining <= 0) {
        setShowWarning(false);
        removeToken();
      } else {
        setShowWarning(false);
      }
    };

    // Check every second
    const interval = setInterval(checkTokenExpiry, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#ff6b6b',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 1000,
      fontSize: '14px',
      fontWeight: '600'
    }}>
      ⚠️ Session expires in {timeLeft} seconds
    </div>
  );
} 