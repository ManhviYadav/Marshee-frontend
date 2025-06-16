'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import SidePanel from '@/components/sidepanel/SidePanel';
import { HiShoppingBag } from 'react-icons/hi';
import styles from './page.module.css';

export default function PetCare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState('Max');

  const petCareCategories = {
    'Food': [
      {
        id: 1,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 2,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 3,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 4,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      }
    ],
    'Pet Insurance': [
      {
        id: 5,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 6,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 7,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 8,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      }
    ],
    'Preventive Health': [
      {
        id: 9,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 10,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 11,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      },
      {
        id: 12,
        name: '',
        description: '',
        icon: null,
        rating: 0,
        availability: ''
      }
    ]
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

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
            
            {/* Search Bar */}
            <div className={styles.searchSection}>
              <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
              </form>
              
              <div className={styles.shoppingBagContainer}>
                <HiShoppingBag className={styles.bagIcon} />
                <span className={styles.bagCount}>4</span>
              </div>
            </div>

            {/* Filters Section */}
            <div className={styles.filtersContainer}>
              {/* Filter Search */}
              <div className={styles.filterSearch}>
                <span className={styles.filterLabel}>Filter search</span>
                <div className={styles.filterIcons}>
                  <div className={styles.filterIcon}>
                    <div className={styles.yellowCircle}></div>
                  </div>
                  <div className={styles.filterIcon}>
                    <div className={styles.yellowCircle}></div>
                  </div>
                  <div className={styles.filterIcon}>
                    <div className={styles.yellowCircle}></div>
                  </div>
                  <div className={styles.filterIcon}>
                    <div className={styles.yellowCircle}></div>
                  </div>
                </div>
              </div>

              {/* Pet Selection */}
              <div className={styles.petSelection}>
                <span className={styles.filterLabel}>Show results for</span>
                <div className={styles.petTabs}>
                  <button
                    className={`${styles.petTab} ${selectedPet === 'Max' ? styles.activeTab : styles.inactiveTab}`}
                    onClick={() => setSelectedPet('Max')}
                  >
                    Max
                  </button>
                  <button
                    className={`${styles.petTab} ${selectedPet === 'Loki' ? styles.activeTab : styles.inactiveTab}`}
                    onClick={() => setSelectedPet('Loki')}
                  >
                    Loki
                  </button>
                </div>
              </div>
            </div>

            {/* Services Categories */}
            <div className={styles.categoriesContainer}>
              {Object.entries(petCareCategories).map(([categoryName, services]) => (
                <div key={categoryName} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{categoryName}</h2>
                  <div className={styles.categoryGrid}>
                    {services.map((service) => (
                      <div key={service.id} className={styles.productCard}>
                      </div>
                    ))}
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