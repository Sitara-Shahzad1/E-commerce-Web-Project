// Product Data
const products = [
    {
      id: 1,
      name: "Minimalist Headphones",
      category: "audio",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience crystal-clear sound with our minimalist headphones. Featuring premium audio technology, comfortable ear cups, and a sleek design that complements any style.",
      isNewArrival: true,
      isFeatured: true
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "wearables",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Stay connected with our elegant smart watch. Track your fitness, receive notifications, and more with this stylish and practical accessory.",
      isNewArrival: true,
      isFeatured: true
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      category: "audio",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Enjoy freedom with our wireless earbuds. These compact and powerful earbuds deliver extraordinary sound quality with a comfortable fit.",
      isNewArrival: false,
      isFeatured: true
    },
    {
      id: 4,
      name: "Leather Watch Band",
      category: "accessories",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Upgrade your watch with our premium leather band. Crafted from high-quality materials, this band adds a touch of sophistication to any watch.",
      isNewArrival: false,
      isFeatured: true
    },
    {
      id: 5,
      name: "Portable Speaker",
      category: "audio",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Take your music everywhere with our portable speaker. Compact yet powerful, it delivers rich, room-filling sound wherever you go.",
      isNewArrival: true,
      isFeatured: false
    },
    {
      id: 6,
      name: "Phone Stand",
      category: "accessories",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Keep your device at the perfect angle with our sleek phone stand. Ideal for video calls, watching movies, or following recipes.",
      isNewArrival: true,
      isFeatured: false
    },
    {
      id: 7,
      name: "Fitness Tracker",
      category: "wearables",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Monitor your health and activity with our advanced fitness tracker. Track steps, heart rate, sleep patterns and more with this lightweight device.",
      isNewArrival: true,
      isFeatured: false
    },
    {
      id: 8,
      name: "Wireless Charger",
      category: "accessories",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1542222216855-78ff1bcf9252?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Simplify your charging routine with our wireless charger. Just place your compatible device on top and watch it power up without cables.",
      isNewArrival: false,
      isFeatured: true
    }
  ];
  
  // User Management
  let currentUser = null;
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  
  // DOM Elements
  const productGrid = document.querySelector('.product-grid');
  const categoryProducts = document.querySelector('.category-products');
  const arrivalsSlider = document.querySelector('.arrivals-slider');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const productModal = document.querySelector('.product-modal');
  const modalContent = document.querySelector('.modal-content');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartItems = document.querySelector('.cart-items');
  const cartCount = document.querySelector('.cart-count');
  const totalAmount = document.querySelector('.total-amount');
  const loadingScreen = document.querySelector('.loading-screen');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const newsletterForm = document.querySelector('.newsletter-form');
  const authModal = document.querySelector('.auth-modal');
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const authModeSwitcher = document.querySelectorAll('.auth-mode-switcher');
  const authButtons = document.querySelector('.auth-buttons');
  const userMenu = document.querySelector('.user-menu');
  
  // Cart functionality
  let cart = [];
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // Load products after a small delay for smooth transitions
      setTimeout(() => {
        renderFeaturedProducts();
        renderCategoryProducts('all');
        renderNewArrivals();
        setupEventListeners();
        updateAuthUI();
      }, 300);
    }, 1500);
  });
  
  // Setup Event Listeners
  function setupEventListeners() {
    // Category tabs
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Render products for the selected category
        renderCategoryProducts(category);
      });
    });
    
    // Open cart
    document.querySelector('.cart-btn').addEventListener('click', () => {
      cartSidebar.classList.add('active');
    });
    
    // Close cart
    document.querySelector('.close-cart').addEventListener('click', () => {
      cartSidebar.classList.remove('active');
    });
    
    document.querySelector('.cart-backdrop').addEventListener('click', () => {
      cartSidebar.classList.remove('active');
    });
    
    // Close modal
    document.querySelector('.close-modal').addEventListener('click', () => {
      productModal.classList.remove('active');
    });
    
    document.querySelector('.modal-backdrop').addEventListener('click', () => {
      productModal.classList.remove('active');
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        alert('Thank you for your purchase! This would proceed to checkout in a real store.');
        cart = [];
        updateCart();
        cartSidebar.classList.remove('active');
      }
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      if (emailInput.value) {
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
      }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Auth Modal Functionality
    document.querySelector('.login-btn').addEventListener('click', () => {
      showAuthModal('login');
    });
  
    document.querySelector('.signup-btn').addEventListener('click', () => {
      showAuthModal('signup');
    });
  
    document.querySelector('.close-auth-modal').addEventListener('click', () => {
      authModal.classList.remove('active');
    });
  
    document.querySelector('.auth-modal-backdrop').addEventListener('click', () => {
      authModal.classList.remove('active');
    });
  
    // Switch between login and signup forms
    authModeSwitcher.forEach(switcher => {
      switcher.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = switcher.dataset.mode;
        showAuthModal(mode);
      });
    });
  
    // Handle form submissions
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
  
    // User menu and logout
    if (document.querySelector('.user-button')) {
      document.querySelector('.user-button').addEventListener('click', () => {
        userMenu.classList.toggle('active');
      });
    }
  
    if (document.querySelector('.logout-button')) {
      document.querySelector('.logout-button').addEventListener('click', () => {
        logout();
      });
    }
  
    // Click outside to close user menu
    document.addEventListener('click', (e) => {
      if (userMenu && userMenu.classList.contains('active') && 
          !e.target.closest('.user-menu') && 
          !e.target.closest('.user-button')) {
        userMenu.classList.remove('active');
      }
    });
  }
  
  // Show Auth Modal
  function showAuthModal(mode) {
    const loginSection = document.querySelector('.login-section');
    const signupSection = document.querySelector('.signup-section');
    
    if (mode === 'login') {
      loginSection.style.display = 'block';
      signupSection.style.display = 'none';
    } else {
      loginSection.style.display = 'none';
      signupSection.style.display = 'block';
    }
    
    authModal.classList.add('active');
  }
  
  // Handle Login
  function handleLogin(e) {
    e.preventDefault();
    
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store user info but not password
      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      
      currentUser = userInfo;
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      
      // Close auth modal and update UI
      authModal.classList.remove('active');
      updateAuthUI();
      showNotification('Login successful!', 'success');
      
      // Clear form
      loginForm.reset();
    } else {
      showNotification('Invalid email or password', 'error');
    }
  }
  
  // Handle Signup
  function handleSignup(e) {
    e.preventDefault();
    
    const name = signupForm.querySelector('input[name="name"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      showNotification('Email already registered', 'error');
      return;
    }
    
    // Create new user
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login
    const userInfo = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    
    currentUser = userInfo;
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    // Close auth modal and update UI
    authModal.classList.remove('active');
    updateAuthUI();
    showNotification('Account created successfully!', 'success');
    
    // Clear form
    signupForm.reset();
  }
  
  // Logout
  function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
    
    if (userMenu) {
      userMenu.classList.remove('active');
    }
  }
  
  // Update Auth UI based on login state
  function updateAuthUI() {
    const authButtonsContainer = document.querySelector('.header-actions');
    
    if (currentUser) {
      // User is logged in
      authButtonsContainer.innerHTML = `
        <button class="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="cart-btn" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L5.76 16.97C5.4 18.22 6.33 19.5 7.66 19.5H17M17 19.5C15.8954 19.5 15 18.6046 15 17.5C15 16.3954 15.8954 15.5 17 15.5C18.1046 15.5 19 16.3954 19 17.5C19 18.6046 18.1046 19.5 17 19.5ZM9 17.5C9 18.6046 8.10457 19.5 7 19.5C5.89543 19.5 5 18.6046 5 17.5C5 16.3954 5.89543 15.5 7 15.5C8.10457 15.5 9 16.3954 9 17.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="cart-count">0</span>
        </button>
        <div class="user-profile">
          <button class="user-button" aria-label="User profile">
            <span>${currentUser.name.charAt(0).toUpperCase()}</span>
          </button>
          <div class="user-menu">
            <div class="user-menu-header">
              <p>Hello, ${currentUser.name}</p>
            </div>
            <ul class="user-menu-options">
              <li><a href="#" class="user-menu-option">My Account</a></li>
              <li><a href="#" class="user-menu-option">My Orders</a></li>
              <li><button class="logout-button">Logout</button></li>
            </ul>
          </div>
        </div>
      `;
    } else {
      // User is not logged in
      authButtonsContainer.innerHTML = `
        <button class="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="login-btn">Login</button>
        <button class="signup-btn">Sign Up</button>
        <button class="cart-btn" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L5.76 16.97C5.4 18.22 6.33 19.5 7.66 19.5H17M17 19.5C15.8954 19.5 15 18.6046 15 17.5C15 16.3954 15.8954 15.5 17 15.5C18.1046 15.5 19 16.3954 19 17.5C19 18.6046 18.1046 19.5 17 19.5ZM9 17.5C9 18.6046 8.10457 19.5 7 19.5C5.89543 19.5 5 18.6046 5 17.5C5 16.3954 5.89543 15.5 7 15.5C8.10457 15.5 9 16.3954 9 17.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="cart-count">0</span>
        </button>
      `;
    }
    
    // Re-attach event listeners for the new buttons
    setupEventListeners();
    
    // Update cart count
    updateCart();
  }
  
  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Render Featured Products
  function renderFeaturedProducts() {
    const featuredProducts = products.filter(product => product.isFeatured);
    
    productGrid.innerHTML = '';
    
    featuredProducts.forEach((product, index) => {
      const productCard = createProductCard(product, index);
      productGrid.appendChild(productCard);
    });
  }
  
  // Render Category Products
  function renderCategoryProducts(category) {
    let filteredProducts;
    
    if (category === 'all') {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(product => product.category === category);
    }
    
    categoryProducts.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      categoryProducts.innerHTML = `
        <div class="no-products">
          <h3>No products found in this category</h3>
        </div>
      `;
      return;
    }
    
    filteredProducts.forEach((product, index) => {
      const productCard = createProductCard(product, index);
      categoryProducts.appendChild(productCard);
    });
  }
  
  // Render New Arrivals
  function renderNewArrivals() {
    const newArrivals = products.filter(product => product.isNewArrival);
    
    arrivalsSlider.innerHTML = '';
    
    newArrivals.forEach((product, index) => {
      const productCard = createProductCard(product, index, 'arrival-card');
      arrivalsSlider.appendChild(productCard);
    });
  }
  
  // Create Product Card
  function createProductCard(product, index, additionalClass = '') {
    const productCard = document.createElement('div');
    productCard.className = `product-card ${additionalClass} fade-in delay-${index % 5 + 1}`;
    
    productCard.innerHTML = `
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        <h3 class="product-card-title">${product.name}</h3>
        <div class="product-card-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <div class="product-card-footer">
          <div class="product-card-price">$${product.price.toFixed(2)}</div>
          <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add to cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to open product modal
    productCard.addEventListener('click', (e) => {
      // Don't open modal if the add to cart button was clicked
      if (!e.target.closest('.add-to-cart-btn')) {
        openProductModal(product);
      }
    });
    
    // Add event listener for add to cart button
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the card click event
      addToCart(product, 1);
    });
    
    return productCard;
  }
  
  // Open Product Modal
  function openProductModal(product) {
    const modalProduct = document.querySelector('.modal-product');
    
    modalProduct.innerHTML = `
      <div class="modal-product-gallery">
        <div class="modal-product-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </div>
      <div class="modal-product-info">
        <div class="modal-product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h2 class="modal-product-title">${product.name}</h2>
        <div class="modal-product-price">$${product.price.toFixed(2)}</div>
        <div class="modal-product-description">${product.description}</div>
        <div class="modal-product-actions">
          <div class="quantity-selector">
            <button class="quantity-btn decrease-btn" aria-label="Decrease quantity">-</button>
            <input type="number" class="quantity-input" value="1" min="1" max="10">
            <button class="quantity-btn increase-btn" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn primary-btn modal-add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
    
    // Setup quantity selector
    const quantityInput = modalProduct.querySelector('.quantity-input');
    const decreaseBtn = modalProduct.querySelector('.decrease-btn');
    const increaseBtn = modalProduct.querySelector('.increase-btn');
    
    decreaseBtn.addEventListener('click', () => {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      if (quantityInput.value < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      }
    });
    
    // Add to cart functionality
    const addToCartBtn = modalProduct.querySelector('.modal-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      addToCart(product, quantity);
      productModal.classList.remove('active');
    });
    
    // Show the modal
    productModal.classList.add('active');
  }
  
  // Add to Cart
  function addToCart(product, quantity) {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if product is already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    // Update cart UI
    updateCart();
    
    // Animate cart count
    cartCount.classList.add('update');
    setTimeout(() => {
      cartCount.classList.remove('update');
    }, 300);
    
    // Show cart sidebar
    cartSidebar.classList.add('active');
  }
  
  // Update Cart
  function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L5.76 16.97C5.4 18.22 6.33 19.5 7.66 19.5H17M17 19.5C15.8954 19.5 15 18.6046 15 17.5C15 16.3954 15.8954 15.5 17 15.5C18.1046 15.5 19 16.3954 19 17.5C19 18.6046 18.1046 19.5 17 19.5ZM9 17.5C9 18.6046 8.10457 19.5 7 19.5C5.89543 19.5 5 18.6046 5 17.5C5 16.3954 5.89543 15.5 7 15.5C8.10457 15.5 9 16.3954 9 17.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <button class="btn primary-btn continue-shopping">Continue Shopping</button>
        </div>
      `;
      
      // Add event listener to continue shopping button
      const continueShoppingBtn = cartItems.querySelector('.continue-shopping');
      continueShoppingBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
      });
    } else {
      cartItems.innerHTML = '';
      
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h3 class="cart-item-title">${item.name}</h3>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-actions">
              <div class="cart-item-quantity">
                <button class="cart-quantity-btn decrease-btn" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button class="cart-quantity-btn increase-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
        
        cartItems.appendChild(cartItem);
      });
      
      // Add event listeners to cart item buttons
      cartItems.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          updateCartItemQuantity(btn.dataset.id, -1);
        });
      });
      
      cartItems.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          updateCartItemQuantity(btn.dataset.id, 1);
        });
      });
      
      cartItems.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          removeFromCart(btn.dataset.id);
        });
      });
    }
    
    // Update total amount
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
  
  // Update Cart Item Quantity
  function updateCartItemQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id == id);
    
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;
      
      // Remove item if quantity is 0 or less
      if (cart[itemIndex].quantity <= 0) {
        removeFromCart(id);
        return;
      }
      
      // Update cart UI
      updateCart();
    }
  }
  
  // Remove from Cart
  function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    updateCart();
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });