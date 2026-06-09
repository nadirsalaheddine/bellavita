// مصفوفة السلة
let cart = [];

// 1. وظيفة إضافة للمنتج
function addToCart(name, usd, eur) {
    cart.push({ name, usd, eur });
    updateCartUI();
    // فتح السلة تلقائياً عند الإضافة
    document.getElementById('side-cart').classList.add('open');
}

// 2. وظيفة الحذف (الجديدة)
function removeFromCart(index) {
    cart.splice(index, 1); // حذف العنصر من المصفوفة
    updateCartUI();
}

// 3. تحديث واجهة السلة
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";
    
    let totalUSD = 0;
    let totalEUR = 0;

    cart.forEach((item, index) => {
        totalUSD += item.usd;
        totalEUR += item.eur;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name}</span>
            <div>
                <strong>$${item.usd}</strong>
                <i class="fas fa-trash delete-btn" onclick="removeFromCart(${index})"></i>
            </div>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.innerText = `$${totalUSD} / €${totalEUR}`;
}

// 4. فتح وغلق السلة
function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
}

// 5. تبديل الثيم (الليل والنهار)
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon';
});

// 6. تبديل اللغات (3 لغات)
function switchLanguage(lang) {
    // تحديث الأزرار
    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.classList.remove('active');
        if(opt.innerText.toLowerCase() === lang) opt.classList.add('active');
    });

    // تبديل النصوص
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if(text) el.innerText = text;
    });
}