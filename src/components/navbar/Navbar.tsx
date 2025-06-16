'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.navbar}>
      {/* Hamburger button - always visible */}
      {!isDropdownOpen && (
        <button 
          className={styles.hamburgerButton}
          onClick={toggleDropdown}
          aria-label="Open menu"
        >
          <HiMenu className={styles.hamburgerIcon} />
        </button>
      )}

      {/* Menu box */}
      <div className={`${styles.menuBox} ${isDropdownOpen ? styles.menuBoxOpen : ''}`}>
        {/* Close button inside the menu */}
        {isDropdownOpen && (
          <button 
            className={styles.closeButton}
            onClick={toggleDropdown}
            aria-label="Close menu"
          >
            <HiX className={styles.closeIcon} />
          </button>
        )}

        {/* Menu items - only show when open */}
        {isDropdownOpen && (
          <ul className={styles.menuList}>
            <li>
              <Link href="/profile" className={styles.menuLink} onClick={() => setIsDropdownOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/notifications" className={styles.menuLink} onClick={() => setIsDropdownOpen(false)}>
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/orders" className={styles.menuLink} onClick={() => setIsDropdownOpen(false)}>
                Orders
              </Link>
            </li>
            <li>
              <Link href="/wallet" className={styles.menuLink} onClick={() => setIsDropdownOpen(false)}>
                Wallet
              </Link>
            </li>
            <li>
              <Link href="/settings" className={styles.menuLink} onClick={() => setIsDropdownOpen(false)}>
                Settings
              </Link>
            </li>
            <li>
              <Link href="/signup-login" className={styles.loginButton} onClick={() => setIsDropdownOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
} 