let cart = [];

function addToCart(name, usdPrice, eurPrice) {
    cart.push({ name, usd: usdPrice, eur: eurPrice });
    updateCartUI();
}

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
            <span>${item.name}</span>
            <strong>$${item.usd} / €${item.eur}</strong>
        `;
        itemsContainer.appendChild(itemEl);
    });
    
    document.getElementById('cart-total').textContent = `$${totalUSD} / €${totalEUR}`;
}

function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
}

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

function switchLanguage(lang) {
    const opts = document.querySelectorAll('.lang-opt');
    opts.forEach(opt => opt.classList.remove('active'));
    event.target.classList.add('active');

    const translatable = document.querySelectorAll('[data-en]');
    translatable.forEach(el => {
        if (lang === 'fr') {
            if (el.getAttribute('data-fr')) el.textContent = el.getAttribute('data-fr');
        } else {
            if (el.getAttribute('data-en')) el.textContent = el.getAttribute('data-en');
        }
    });
}