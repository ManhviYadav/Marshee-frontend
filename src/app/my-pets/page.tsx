'use client';

import Navbar from '@/components/navbar/Navbar';
import SidePanel from '@/components/sidepanel/SidePanel';
import styles from './page.module.css';

export default function MyPets() {
  return (
    <div className={styles.pageWrapper}>
      {/* User dropdown in top right */}
      <Navbar />
      
      {/* Sidebar */}
      <SidePanel />
      
      {/* Main content */}
      <div className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <h1 className={styles.pageTitle}>mypets page</h1>
        </div>
      </div>
    </div>
  );
} 