'use client';

import Navbar from '@/components/navbar/Navbar';
import SidePanel from '@/components/sidepanel/SidePanel';
import styles from './page.module.css';

// Heart icon component
const HeartIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={styles.heartSvg}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export default function Community() {
  const communityCards = [
    'Blood Donation',
    'Search',
    'Feeding',
    'Fostering',
    'Adoption',
    'Dog Walks',
    'Pool Parties',
    'Dog Dating',
    'Pet Training'
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Left Div - Sidebar Only */}
      <div className={styles.leftContainer}>
        <SidePanel />
      </div>
      
      {/* Right Div - Main Content */}
      <div className={styles.rightContainer}>
        {/* User dropdown in top right */}
        <Navbar />
        
        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={styles.contentContainer}>
            {/* Join Community Card */}
            <div className={styles.joinCard}>
              <h2 className={styles.joinTitle}>Join the marshee pet community!</h2>
              <p className={styles.joinSubtitle}>Select your causes close to your heart and start contributing</p>
              <button className={styles.joinButton}>Join</button>
            </div>

            {/* Community Cards Grid */}
            <div className={styles.communityCardsContainer}>
              {communityCards.map((cardTitle, index) => (
                <div key={index} className={styles.communityCard}>
                  <div className={styles.memberCount}>50k mem</div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardTitle}>{cardTitle}</div>
                    <div className={styles.cardStats}>
                      <HeartIcon />
                      <span className={styles.likeCount}>5k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 