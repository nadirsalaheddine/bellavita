let cart = [];

// إضافة منتج للسلة مع تفعيل أنيمايشن النبض
function addToCart(name, usdPrice, eurPrice) {
    cart.push({ id: Date.now() + Math.random(), name, usd: usdPrice, eur: eurPrice });
    
    // تفعيل تأثير النبض على زر السلة
    const cartWrapper = document.getElementById('cart-btn-wrapper');
    cartWrapper.classList.add('pulse-animation');
    setTimeout(() => {
        cartWrapper.classList.remove('pulse-animation');
    }, 400);

    updateCartUI();
}

// 🗑️ دالة حذف منتج معين من السلة وإعادة الحساب تلقائياً
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// تحديث السلة والواجهة
function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    
    let totalUSD = 0;
    let totalEUR = 0;
    
    cart.forEach((item) => {
        totalUSD += item.usd;
        totalEUR += item.eur;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-details">
                <span>${item.name}</span>
                <strong>$${item.usd} / €${item.eur}</strong>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove Item">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        itemsContainer.appendChild(itemEl);
    });
    
    document.getElementById('cart-total').textContent = `$${totalUSD} / €${totalEUR}`;
}

function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
}

// زر تبديل الثيم
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggleBtn.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// 🌐 دالة تبديل اللغات المتطورة (تدعم الإنجليزية، الفرنسية، والإيطالية)
function switchLanguage(lang, event) {
    const opts = document.querySelectorAll('.lang-opt');
    opts.forEach(opt => opt.classList.remove('active'));
    if(event) {
        event.target.classList.add('active');
    }

    const translatable = document.querySelectorAll('[data-en]');
    translatable.forEach(el => {
        if (lang === 'fr') {
            if (el.getAttribute('data-fr')) el.textContent = el.getAttribute('data-fr');
        } else if (lang === 'it') {
            if (el.getAttribute('data-it')) el.textContent = el.getAttribute('data-it');
        } else {
            if (el.getAttribute('data-en')) el.textContent = el.getAttribute('data-en');
        }
    });
}