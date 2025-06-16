'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import SidePanel from '@/components/sidepanel/SidePanel';
import { HiPlus, HiMinus, HiShoppingBag } from 'react-icons/hi';
import { FaPaw, FaCat, FaHorse } from 'react-icons/fa';
import styles from './page.module.css';

export default function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState('Max');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([
    { id: 3, name: 'Interactive Squeaky Toy - Bone Shape', price: 630, quantity: 4, image: '/images/FoodMockup.webp' }
  ]);

  const products = [
    { id: 1, name: 'Organic Rice Dog Food - Adult', price: 2250, image: '/images/FoodMockup.webp' },
    { id: 2, name: 'Salmon & Sweet Potato Dog Food', price: 2610, image: '/images/FoodMockup.webp' },
    { id: 3, name: 'Interactive Squeaky Toy - Bone Shape', price: 630, image: '/images/FoodMockup.webp' },
    { id: 4, name: 'Tuna Flavored Cat Food - 1kg', price: 750, image: '/images/FoodMockup.webp' },
    { id: 5, name: 'Interactive Feather Wand Cat Toy', price: 300, image: '/images/FoodMockup.webp' },
    { id: 6, name: 'Comfy Cat Bed - Medium', price: 1250, image: '/images/FoodMockup.webp' },
    { id: 7, name: 'Hamster Wheel - Silent Running', price: 520, image: '/images/FoodMockup.webp' },
    { id: 8, name: 'Chew Treat Sticks - Honey Flavour', price: 230, image: '/images/FoodMockup.webp' },
    { id: 9, name: 'Mini Water Bottle - Leak Proof', price: 340, image: '/images/FoodMockup.webp' },
    { id: 10, name: 'Floating Turtle Dock Platform', price: 1190, image: '/images/FoodMockup.webp' },
    { id: 11, name: 'Turtle Food Pellets - 500g', price: 480, image: '/images/FoodMockup.webp' },
    { id: 12, name: 'UVB Light Lamp for Turtles', price: 870, image: '/images/FoodMockup.webp' },
    { id: 13, name: 'Horse Grooming Kit - 5-in-1', price: 3200, image: '/images/FoodMockup.webp' },
    { id: 14, name: 'Premium Horse Feed - 25kg', price: 3100, image: '/images/FoodMockup.webp' },
    { id: 15, name: 'Leather Horse Saddle', price: 5800, image: '/images/FoodMockup.webp' },
    { id: 16, name: 'Carrot Shaped Chew Toy', price: 210, image: '/images/FoodMockup.webp' },
    { id: 17, name: 'Timothy Hay - 1kg', price: 620, image: '/images/FoodMockup.webp' },
    { id: 18, name: 'Rabbit Cage - Foldable', price: 1850, image: '/images/FoodMockup.webp' },
    { id: 19, name: 'Bird Cage Swing - Small Size', price: 350, image: '/images/FoodMockup.webp' },
    { id: 20, name: 'Sunflower Seed Mix - 500g', price: 290, image: '/images/FoodMockup.webp' },
    { id: 21, name: 'Bird Water Dispenser', price: 199, image: '/images/FoodMockup.webp' }
  ];

  const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const updateQuantity = (productId: number, change: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  // Note: addToCart function is available for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    const quantity = productQuantities[product.id] || 1;
    if (quantity > 0) {
      setCart(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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
            
            {/* Search Bar and Shopping Bag */}
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
              
              <div className={styles.shoppingBagContainer} onClick={() => setIsCartOpen(true)}>
                <HiShoppingBag className={styles.bagIcon} />
                <span className={styles.bagCount}>{getCartItemCount()}</span>
              </div>
            </div>

            {/* Filters Section */}
            <div className={styles.filtersContainer}>
              {/* Filter Search */}
              <div className={styles.filterSearch}>
                <span className={styles.filterLabel}>Filter search</span>
                <div className={styles.filterIcons}>
                  <div className={styles.filterIcon}>
                    <FaPaw />
                  </div>
                  <div className={styles.filterIcon}>
                    <FaCat />
                  </div>
                  <div className={styles.filterIcon}>
                    <FaHorse />
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

            {/* Products Grid */}
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={98}
                      height={98}
                      className={styles.productImage}
                    />
                  </div>
                  
                  <div className={styles.productName}>{product.name}</div>
                  
                  <div className={styles.productFooter}>
                    <div className={styles.productPrice}>₹{product.price}</div>
                    
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <HiPlus />
                      </button>
                      
                      <span className={styles.quantity}>
                        {productQuantities[product.id] || 0}
                      </span>
                      
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <HiMinus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)} />
          <div className={styles.cartSidebar}>
            <div className={styles.cartHeader}>
              <h2>Your Cart</h2>
              <button
                className={styles.closeCartButton}
                onClick={() => setIsCartOpen(false)}
              >
                ✖
              </button>
            </div>
            
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <p className={styles.cartItemName}>{item.name}</p>
                    <p className={styles.cartItemQuantity}>Qty: {item.quantity}</p>
                    <p className={styles.cartItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Subtotal:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 