// ── CART STORAGE ──
function getCart() {
  try { return JSON.parse(localStorage.getItem('ember_cart') || '[]'); } catch { return []; }
}
function saveCart(c) { localStorage.setItem('ember_cart', JSON.stringify(c)); }
function getCartCount() { return getCart().reduce((s,i)=>s+i.qty,0); }

function addToCart(item) {
  let cart = getCart();
  const ex = cart.find(c=>c.id===item.id);
  if(ex) ex.qty++;
  else cart.push({...item, qty:1});
  saveCart(cart);
  updateCartBadge();
  showToast('✅ '+item.name+' added to cart');
}

function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el=>{ el.textContent=getCartCount(); });
}

// ── TOAST ──
function showToast(msg) {
  let t = document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2800);
}

// ── NAV HAMBURGER ──
function initNav() {
  const hbg = document.getElementById('hamburger');
  const nc  = document.getElementById('navCenter');
  if(hbg && nc) hbg.addEventListener('click',()=>nc.classList.toggle('open'));

  // Mark active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center a').forEach(a=>{
    if(a.getAttribute('href')===page) a.classList.add('active');
  });

  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', initNav);
