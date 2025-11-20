// Utilities shared by cart and checkout pages
const DB = window.DB;

function findProduct(id){ return (DB.products || []).find(p=>p.id===id); }

function cartItemsExpanded(){
  return getCart().map(it => {
    const p = findProduct(it.id);
    return p ? { ...p, qty: it.qty } : null;
  }).filter(Boolean);
}

function cartSubtotal(items){
  return items.reduce((sum, it)=> sum + it.price * it.qty, 0);
}

function renderCartTable(tbodyId, items){
  const body = document.getElementById(tbodyId);
  body.innerHTML = items.map(it => `
    <tr>
      <td style="display:flex;gap:10px;align-items:center">
        <img src="${it.image}" alt="" style="width:60px;height:60px;object-fit:cover;border-radius:10px"/>
        <div>
          <div style="font-weight:700">${it.title}</div>
          <div class="help">${labelFromCat(it.category)}</div>
        </div>
      </td>
      <td>${formatPrice(it.price)}</td>
      <td>
        <div class="qty">
          <button onclick="changeQty('${it.id}',-1)">−</button>
          <span>${it.qty}</span>
          <button onclick="changeQty('${it.id}',1)">+</button>
        </div>
      </td>
      <td>${formatPrice(it.price * it.qty)}</td>
      <td class="row-actions">
        <button class="btn" onclick="removeItem('${it.id}')">Remove</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="5" class="muted">Your cart is empty.</td></tr>`;
}

function changeQty(id, delta){
  const cart = getCart();
  const i = cart.findIndex(it=>it.id===id);
  if (i>-1){
    cart[i].qty = Math.max(1, cart[i].qty + delta);
    setCart(cart);
    refreshCartPage?.();
  }
}

function removeItem(id){
  const cart = getCart().filter(it=>it.id!==id);
  setCart(cart);
  refreshCartPage?.();
}

function setBuyNowItem(id){
  // Used when user clicks "Buy Now" – we create a temporary checkout selection
  localStorage.setItem('shopx_checkout_single', JSON.stringify({ id, qty: 1 }));
}
function getBuyNowItem(){
  try{ return JSON.parse(localStorage.getItem('shopx_checkout_single')); }
  catch{ return null; }
}
function clearBuyNowItem(){ localStorage.removeItem('shopx_checkout_single'); }

// Order store (demo)
const LS_ORDERS = 'shopx_orders';
function saveOrder(order){
  const list = (()=>{ try{return JSON.parse(localStorage.getItem(LS_ORDERS))||[]}catch{return[]} })();
  list.push(order);
  localStorage.setItem(LS_ORDERS, JSON.stringify(list));
}
