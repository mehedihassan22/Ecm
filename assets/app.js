// ---------- Auth UI ----------
function renderAuthArea(showGoHomeIfLoggedIn = false) {
  const el = document.getElementById('authArea');
  const user = currentUser?.();
  if (!el) return;

  // Show/hide Orders link
  const ordersLink = document.getElementById('ordersLink');
  if (ordersLink) ordersLink.style.display = user ? 'inline-block' : 'none';

  if (user) {
    el.innerHTML = `
      <div class="user-chip">
        <span>👤 ${user.name}</span>
      </div>
      <a class="btn ghost" href="cart.html">Cart (<span id="cartCount">0</span>)</a>
      ${showGoHomeIfLoggedIn ? '<a class="btn ghost" href="index.html">Home</a>' : ''}
      <button class="btn" onclick="logout()">Logout</button>
    `;
  } else {
    el.innerHTML = `
      <a class="btn ghost" href="login.html">Login</a>
      <a class="btn primary" href="register.html">Sign Up</a>
    `;
  }
  updateCartBadge?.();
}

// ---------- Helpers ----------
function formatPrice(n){ return '$' + Number(n).toFixed(2); }
function labelFromCat(slug){
  const found = (window.DB?.categories || []).find(c=>c.slug===slug);
  return found ? found.name : 'General';
}
function getParam(key){
  const p = new URLSearchParams(location.search);
  return p.get(key);
}
function setParams(obj){
  const p = new URLSearchParams(location.search);
  Object.entries(obj).forEach(([k,v])=>{
    if (v === undefined || v === null || v === '' || v === 'all') p.delete(k);
    else p.set(k, v);
  });
  location.search = p.toString();
}

// ---------- Global Search in header ----------
function wireGlobalSearch(){
  const form = document.getElementById('siteSearchForm');
  if (!form) return;
  const qInput = document.getElementById('siteSearchInput');
  const catSel = document.getElementById('siteSearchCat');

  // fill categories if empty
  if (catSel && catSel.options.length <= 1 && window.DB?.categories) {
    window.DB.categories.forEach(c => catSel.insertAdjacentHTML('beforeend', `<option value="${c.slug}">${c.name}</option>`));
  }

  // preload from URL if on category page
  const q = getParam('q'); const cat = getParam('cat') || 'all';
  if (q) qInput.value = q;
  if (catSel && cat) catSel.value = cat;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const qVal = (qInput.value || '').trim();
    const catVal = catSel ? catSel.value : 'all';
    // go to category page with params
    const url = new URL('category.html', location.origin);
    if (qVal) url.searchParams.set('q', qVal);
    if (catVal && catVal !== 'all') url.searchParams.set('cat', catVal);
    location.href = url.toString();
  });
}

// ---------- Cart ----------
const LS_CART = 'shopx_cart';
function getCart(){ try { return JSON.parse(localStorage.getItem(LS_CART)) || []; } catch { return []; } }
function setCart(c){ localStorage.setItem(LS_CART, JSON.stringify(c)); updateCartBadge(); }
function clearCart(){ localStorage.removeItem(LS_CART); updateCartBadge(); }
function addToCart(productId, qty=1){
  if (!currentUser()) {
    sessionStorage.setItem('redirectTo', location.pathname + location.search);
    alert('Please log in to add items to cart.');
    location.href = 'login.html';
    return;
  }
  const cart = getCart();
  const idx = cart.findIndex(i=>i.id===productId);
  if (idx>-1) cart[idx].qty += qty;
  else cart.push({ id: productId, qty });
  setCart(cart);
  alert('Item added to cart!');
}
function cartCount(){ return getCart().reduce((sum,i)=>sum+i.qty,0); }
function updateCartBadge(){
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cartCount();
}

// ---------- Product Cards ----------
function productCard(p){
  return `
    <article class="card product">
      <a class="p-img" href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </a>
      <div class="p-body">
        <h3 class="p-title"><a href="product.html?id=${p.id}">${p.title}</a></h3>
        <p class="p-desc">${p.description}</p>
        <div class="p-meta">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="badge">${labelFromCat(p.category)}</span>
        </div>
        <div class="right" style="justify-content:space-between;margin-top:10px">
          <button class="btn" onclick="addToCart('${p.id}',1)">Add to Cart</button>
          <button class="btn primary" onclick="buyNow('${p.id}')">Buy Now</button>
        </div>
      </div>
    </article>
  `;
}
function buyNow(productId){
  if (!currentUser()) {
    sessionStorage.setItem('redirectTo', `checkout.html?buy=${productId}`);
    alert('Please log in to buy products.');
    location.href = 'login.html';
    return;
  }
  location.href = `checkout.html?buy=${productId}`;
}
function mountProducts(gridId, list){
  const grid = document.getElementById(gridId);
  grid.innerHTML = list.map(productCard).join('') || `<p class="muted">No products found.</p>`;
}

// expose
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.buyNow = buyNow;
window.wireGlobalSearch = wireGlobalSearch;
window.getParam = getParam;
window.formatPrice = formatPrice;
window.labelFromCat = labelFromCat;
