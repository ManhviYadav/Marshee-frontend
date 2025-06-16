import Link from 'next/link';
import Image from 'next/image';
import styles from './SidePanel.module.css';

export default function SidePanel() {
  return (
    <div className={styles.sidePanel}>
      {/* Logo at the top */}
      <div className={styles.logoContainer}>
        <Image 
          src="/images/logo-marshee.webp" 
          alt="Marshee Logo" 
          width={96} 
          height={70}
          className={styles.logo} 
        />
      </div>
      
      {/* Navigation items container */}
      <div className={styles.navContainer}>
        <Link href="/home" className={styles.navLink}>
          <div className={`${styles.navItem} ${styles.navItemFirst}`}>
            <Image 
              src="/images/home-button1.svg" 
              alt="home" 
              width={60} 
              height={60}
              className={styles.navIcon} 
            />
            <span className={styles.navLabel}>home</span>
          </div>
        </Link>

        <Link href="/community" className={styles.navLink}>
          <div className={styles.navItem}>
            <Image 
              src="/images/community.svg" 
              alt="community" 
              width={50} 
              height={50}
              className={styles.navIcon} 
            />
            <span className={styles.navLabel}>community</span>
          </div>
        </Link>

        <Link href="/store" className={styles.navLink}>
          <div className={styles.navItem}>
            <Image 
              src="/images/marketplace.svg" 
              alt="marketplace" 
              width={50} 
              height={50}
              className={styles.navIcon} 
            />
            <span className={styles.navLabel}>store</span>
          </div>
        </Link>

        <Link href="/petcare" className={styles.navLink}>
          <div className={styles.navItem}>
            <Image 
              src="/images/services.svg" 
              alt="petcare" 
              width={50} 
              height={50}
              className={styles.navIcon} 
            />
            <span className={styles.navLabel}>petcare</span>
          </div>
        </Link>

        <Link href="/my-pets" className={styles.navLink}>
          <div className={`${styles.navItem} ${styles.navItemLast}`}>
            <Image 
              src="/images/mypets.svg" 
              alt="mypets" 
              width={50} 
              height={50}
              className={styles.navIcon} 
            />
            <span className={styles.navLabel}>mypets</span>
          </div>
        </Link>
      </div>
    </div>
  );
} 