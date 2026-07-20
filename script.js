// Zulie Electronique - Lojik Prensipal Paj la

// Done Pwodwi yo
const products = [
    {
        id: 1,
        name: "MacBook Air M2",
        category: "ordinateur",
        price: 1299,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=60",
        rating: 4.8,
        reviews: 124,
        badge: "Nouveau"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "smartphone",
        price: 1099,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=60",
        rating: 4.9,
        reviews: 256,
        badge: "Populaire"
    },
    {
        id: 3,
        name: "Dell XPS 13",
        category: "ordinateur",
        price: 999,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=60",
        rating: 4.5,
        reviews: 88,
        badge: ""
    },
    {
        id: 4,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphone",
        price: 1199,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=60",
        rating: 4.7,
        reviews: 142,
        badge: ""
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        category: "montre",
        price: 399,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=60",
        rating: 4.6,
        reviews: 95,
        badge: "Promo"
    },
    {
        id: 6,
        name: "Casque Bose QuietComfort",
        category: "accessoire",
        price: 429,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
        rating: 4.8,
        reviews: 110,
        badge: "Nouveau"
    },
    {
        id: 7,
        name: "Samsung Galaxy Watch 6",
        category: "montre",
        price: 299,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60",
        rating: 4.4,
        reviews: 62,
        badge: ""
    },
    {
        id: 8,
        name: "AirPods Pro 2",
        category: "accessoire",
        price: 249,
        image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop&q=60",
        rating: 4.7,
        reviews: 198,
        badge: ""
    },
    {
        id: 9,
        name: "Clavier Logitech MX Keys",
        category: "accessoire",
        price: 119,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60",
        rating: 4.6,
        reviews: 45,
        badge: "Nouveau"
    },
    {
        id: 10,
        name: "iPad Pro M4",
        category: "ordinateur",
        price: 999,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60",
        rating: 4.9,
        reviews: 74,
        badge: "Promo"
    }
];

// Selektè DOM yo
const productsContainer = document.querySelector('.products-container');
const searchInput = document.getElementById('search-product');
const categoryFilter = document.getElementById('filter-category');
const categoryButtons = document.querySelectorAll('.categories button');
const loginBtn = document.getElementById('login-btn');
const loginModalOverlay = document.getElementById('login-modal-overlay');
const loginModalClose = document.getElementById('login-modal-close');
const loginForm = document.getElementById('login-form');
const favoriteCountEl = document.getElementById('favorite-count');
const cartCountEl = document.getElementById('cart-count');
const contactForm = document.getElementById('contact-form');
const heroButtons = document.querySelectorAll('#hero button');
const aboutBtn = document.querySelector('.about-btn');

// Nouvo Selektè pou Enskripsyon
const loginNameInput = document.getElementById('login-name');
const loginConfirmPasswordInput = document.getElementById('login-confirm-password');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const submitBtnText = document.getElementById('submit-btn-text');
const toggleModeText = document.getElementById('toggle-mode-text');

// Eta aplikasyon an
let isLoggedIn = false;
let loggedInUser = null;
let favorites = new Set();
let cart = new Map();
let currentCategory = 'all';
let searchQuery = '';
let modalMode = 'login'; // 'login' oswa 'signup'

// Inisyalize Itilizatè yo nan localStorage
function initUserDatabase() {
    if (!localStorage.getItem('zulie_registered_users')) {
        const defaultUsers = [
            { name: "Test User", email: "test@zulie.ht", password: "123" }
        ];
        localStorage.setItem('zulie_registered_users', JSON.stringify(defaultUsers));
    }
}

// Fonksyon pou Toast Notification
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Jere verifikasyon login anvan entèraksyon
function requireLogin(actionName, callback) {
    if (isLoggedIn) {
        if (callback) callback();
        return true;
    } else {
        switchMode('login');
        openLoginModal();
        showToast(`Silvouplè konekte pou kapab ${actionName}.`, 'warning');
        return false;
    }
}

// Louvri modal login lan
function openLoginModal() {
    loginModalOverlay.classList.add('active');
}

// Fèmen modal login lan
function closeLoginModal() {
    loginModalOverlay.classList.remove('active');
    loginForm.reset();
    switchMode('login'); // Retounen nan koneksyon pa defo pou pwochen fwa
}

// Chanje Mòd Modal la (Login <-> Signup)
function switchMode(mode) {
    modalMode = mode;
    if (mode === 'signup') {
        loginModalOverlay.classList.add('signup-mode');
        modalTitle.textContent = 'Créer un compte';
        modalDesc.textContent = 'Rejoignez la communauté de Zulie Electronique';
        submitBtnText.innerHTML = '<i class="fa-solid fa-user-plus"></i> S\'inscrire';
        toggleModeText.innerHTML = 'Déjà un compte ? <a id="toggle-mode-link">Se connecter</a>';

        loginNameInput.required = true;
        loginConfirmPasswordInput.required = true;
    } else {
        loginModalOverlay.classList.remove('signup-mode');
        modalTitle.textContent = 'Se Connecter';
        modalDesc.textContent = 'Veuillez vous connecter pour interagir avec le site';
        submitBtnText.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Connexion';
        toggleModeText.innerHTML = 'Pas encore de compte ? <a id="toggle-mode-link">S\'inscrire</a>';

        loginNameInput.required = false;
        loginConfirmPasswordInput.required = false;
    }
}

// Mizajou Bouton login nan header
function updateLoginUI() {
    if (isLoggedIn) {
        const userName = localStorage.getItem('zulie_logged_user_name') || 'Client';
        loginBtn.innerHTML = `${userName} (Déconnexion) <i class="fa-solid fa-right-from-bracket" style="margin-left: 5px;"></i>`;
        loginBtn.style.background = '#ef4444'; // Wouj pou dekoneksyon
    } else {
        loginBtn.innerHTML = 'Connexion';
        loginBtn.style.background = '#2563eb'; // Ble pou koneksyon
        // Reyalize kontè yo lè w dekonekte
        favorites.clear();
        cart.clear();
        updateCounters();
    }
}

// Jere Enskripsyon (Signup)
function handleSignup(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showToast('Modpas yo pa koresponn. Eseye ankò.', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('zulie_registered_users')) || [];
    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
        showToast('Imèl sa a deja itilize pou yon lòt kont.', 'error');
        return;
    }

    const submitBtn = loginForm.querySelector('.login-submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Kreyasyon kont...';

    setTimeout(() => {
        // Sove nouvo itilizatè a
        users.push({ name, email, password });
        localStorage.setItem('zulie_registered_users', JSON.stringify(users));

        showToast('Kont ou a kreye avèk siksè! Konekte kounye a.', 'success');

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        // Baskile tounen nan login
        switchMode('login');
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = password;
    }, 1000);
}

// Jere Koneksyon (Login)
function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('zulie_registered_users')) || [];
    const matchedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (!matchedUser) {
        showToast('Imèl oswa modpas kòrèk. Silvouplè verifye oswa kreye yon kont.', 'error');
        return;
    }

    const submitBtn = loginForm.querySelector('.login-submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Chajman...';

    setTimeout(() => {
        isLoggedIn = true;
        localStorage.setItem('zulie_logged_in', 'true');
        localStorage.setItem('zulie_logged_user_name', matchedUser.name);

        updateLoginUI();
        closeLoginModal();
        showToast(`Byenvini, ${matchedUser.name}! Ou konekte avèk siksè.`, 'success');

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        // Rafrechi lis la
        renderProducts();
    }, 1000);
}

// Jere Dekoneksyon (Logout)
function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('zulie_logged_in');
    localStorage.removeItem('zulie_logged_user_name');
    updateLoginUI();
    showToast('Ou dekonekte avèk siksè.', 'info');
    renderProducts();
}

// Jere bouton kontè yo
function updateCounters() {
    favoriteCountEl.textContent = favorites.size;

    let totalCartItems = 0;
    cart.forEach(quantity => {
        totalCartItems += quantity;
    });
    cartCountEl.textContent = totalCartItems;
}

// Jenere HTML pou Rating zetwal yo
function getRatingStarsHTML(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            starsHTML += '<i class="fa-regular fa-star"></i>';
        }
    }
    return starsHTML;
}

// Jenere kat pwodwi yo dinamikman
function renderProducts() {
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; margin-bottom: 15px; color: #cbd5e1;"></i>
                <p style="font-size: 16px; font-weight: 500;">Pa gen okenn pwodwi ki koresponn ak rechèch ou a.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const isFav = favorites.has(product.id);
        const inCart = cart.has(product.id);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;

        const badgeHTML = product.badge ? `<span class="product-badge ${product.badge.toLowerCase() === 'nouveau' ? 'new' : ''}">${product.badge}</span>` : '';

        card.innerHTML = `
            <div class="product-img-container">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title" title="${product.name}">${product.name}</h3>
                <div class="product-rating">
                    ${getRatingStarsHTML(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <div class="product-actions">
                        <button class="favorite-btn ${isFav ? 'active' : ''}" title="Ajouter aux favoris">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        <button class="cart-btn ${inCart ? 'active' : ''}" title="Ajouter au panier">
                            <i class="fa-solid ${inCart ? 'fa-check' : 'fa-cart-plus'}"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Klike sou bouton favori
        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            requireLogin('ajoute pwodwi nan favori', () => {
                if (favorites.has(product.id)) {
                    favorites.delete(product.id);
                    favBtn.classList.remove('active');
                    favBtn.querySelector('i').className = 'fa-regular fa-heart';
                    showToast(`${product.name} retire nan favori ou yo.`, 'info');
                } else {
                    favorites.add(product.id);
                    favBtn.classList.add('active');
                    favBtn.querySelector('i').className = 'fa-solid fa-heart';
                    showToast(`${product.name} ajoute nan favori ou yo!`, 'success');
                }
                updateCounters();
            });
        });

        // Klike sou bouton panyen
        const cartBtn = card.querySelector('.cart-btn');
        cartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            requireLogin('ajoute pwodwi nan panyen', () => {
                if (cart.has(product.id)) {
                    cart.delete(product.id);
                    cartBtn.classList.remove('active');
                    cartBtn.querySelector('i').className = 'fa-solid fa-cart-plus';
                    showToast(`${product.name} retire nan panyen an.`, 'info');
                } else {
                    cart.set(product.id, 1);
                    cartBtn.classList.add('active');
                    cartBtn.querySelector('i').className = 'fa-solid fa-check';
                    showToast(`${product.name} ajoute nan panyen an!`, 'success');
                }
                updateCounters();
            });
        });

        productsContainer.appendChild(card);
    });
}

// Synkronize Kategori ant Bouton ak Dropdown Select
function syncCategory(category) {
    currentCategory = category;

    // 1. Mizajou Bouton yo
    categoryButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        let btnCategory = 'all';
        if (btnText.includes('ordinateur')) btnCategory = 'ordinateur';
        else if (btnText.includes('smartphone')) btnCategory = 'smartphone';
        else if (btnText.includes('montre')) btnCategory = 'montre';
        else if (btnText.includes('accessoire')) btnCategory = 'accessoire';

        if (btnCategory === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Mizajou Dropdown la
    categoryFilter.value = category;

    // 3. Rafrechi Pwodwi yo
    renderProducts();
}

// Enstale Event Listeners
function setupEventListeners() {

    // Bouton Koneksyon nan Header
    loginBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            switchMode('login');
            openLoginModal();
        }
    });

    // Fèmen modal yo
    loginModalClose.addEventListener('click', closeLoginModal);
    loginModalOverlay.addEventListener('click', (e) => {
        if (e.target === loginModalOverlay) {
            closeLoginModal();
        }
    });

    // Baskil mòd modal la ak delegasyon evènman
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'toggle-mode-link') {
            e.preventDefault();
            if (modalMode === 'login') {
                switchMode('signup');
            } else {
                switchMode('login');
            }
        }
    });

    // Soumèt fòmilè login / signup
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (modalMode === 'signup') {
            const name = loginNameInput.value;
            const confirmPassword = loginConfirmPasswordInput.value;
            handleSignup(name, email, password, confirmPassword);
        } else {
            handleLogin(email, password);
        }
    });

    // Intercept search input si li pa konekte
    searchInput.addEventListener('mousedown', (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            searchInput.blur();
            requireLogin('chèche yon pwodwi', null);
        }
    });

    searchInput.addEventListener('input', (e) => {
        if (requireLogin('chèche yon pwodwi', null)) {
            searchQuery = e.target.value;
            renderProducts();
        } else {
            searchInput.value = '';
        }
    });

    // Intercept category dropdown
    categoryFilter.addEventListener('mousedown', (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            categoryFilter.blur();
            requireLogin('filtre pa kategori', null);
        }
    });

    categoryFilter.addEventListener('change', (e) => {
        if (isLoggedIn) {
            syncCategory(e.target.value);
        } else {
            categoryFilter.value = 'all';
        }
    });

    // Intercept category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            requireLogin('filtre pa kategori', () => {
                const btnText = button.textContent.toLowerCase();
                let category = 'all';
                if (btnText.includes('ordinateur')) category = 'ordinateur';
                else if (btnText.includes('smartphone')) category = 'smartphone';
                else if (btnText.includes('montre')) category = 'montre';
                else if (btnText.includes('accessoire')) category = 'accessoire';

                syncCategory(category);
            });
        });
    });

    // Intercept Hero Buttons
    heroButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            requireLogin('achte pwodwi yo', () => {
                // Scroll to products
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                showToast('Chwazi pwodwi ou vle achte yo nan katalòg la.', 'info');
            });
        });
    });

    // Intercept About Button
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            requireLogin('wè pwodwi yo', () => {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Intercept Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            requireLogin('voye yon mesaj', () => {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Chajman...';

                setTimeout(() => {
                    showToast('Mesaj ou a voye avèk siksè! N ap reponn ou talè.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1000);
            });
        });

        // Lock click/focus sou opinyon kontak yo tou pou asire ke itilizatè a konekte anvan li ranpli fòmilè a
        const contactInputs = contactForm.querySelectorAll('input, textarea');
        contactInputs.forEach(input => {
            input.addEventListener('mousedown', (e) => {
                if (!isLoggedIn) {
                    e.preventDefault();
                    input.blur();
                    requireLogin('kontakte nou', null);
                }
            });
        });
    }
}

// Inisyalizasyon aplikasyon an
function init() {
    // 0. Inisyalize DB itilizatè yo
    initUserDatabase();

    // 1. Tcheke si li te deja konekte nan localStorage
    const savedLogin = localStorage.getItem('zulie_logged_in');
    if (savedLogin === 'true') {
        isLoggedIn = true;
    }

    // 2. Mete ajou UI login
    updateLoginUI();

    // 3. Jwe evènman yo
    setupEventListeners();

    // 4. Afiche Pwodwi yo
    renderProducts();
}

// Kouri lè paj la fin chaje
document.addEventListener('DOMContentLoaded', init);