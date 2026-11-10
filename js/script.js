const products = [
  { id:1, name:"Sunny Charm Bracelet", price:89000, cat:"bracelet", badge:"BEST", img:"assets/products/bracelet.jpg" },
  { id:2, name:"Cloudy Day Necklace", price:109000, cat:"necklace", badge:"NEW", img:"assets/products/necklace.jpg" },
  { id:3, name:"Tiny Sparkle Ring", price:79000, cat:"ring", badge:"CUTE", img:"assets/products/ring.jpg" },
  { id:4, name:"Twinkle Earrings", price:99000, cat:"earrings", badge:"HOT", img:"assets/products/earrings.jpg" },
  { id:5, name:"Pastel Anklet", price:69000, cat:"anklet", badge:"NEW", img:"assets/products/anklet.jpg" },
  { id:6, name:"Mini Hair Clip Set", price:59000, cat:"hair", badge:"", img:"assets/products/hair.jpg" },
  { id:7, name:"Name Charm Pendant", price:85000, cat:"charms", badge:"", img:"assets/products/charms.jpg" },
  { id:8, name:"Sweet Matching Set", price:159000, cat:"sets", badge:"BUNDLE", img:"assets/products/sets.jpg" }
];

let cart = [];
let wishlist = [];

function formatRp(n){ return "Rp" + n.toLocaleString("id-ID"); }

function renderProducts(filter = "all"){
  const grid = document.getElementById("productGrid");
  const list = filter === "all" ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = list.map(p => `
    <article class="product" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">${formatRp(p.price)}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">+ Tambah</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const exist = cart.find(x => x.id === id);
  if(exist) exist.qty++;
  else cart.push({...p, qty:1});
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").textContent = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cartTotal").textContent = formatRp(cart.reduce((s,i)=>s+i.price*i.qty,0));
  const items = document.getElementById("cartItems");
  items.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="">
      <div>
        <strong>${i.name}</strong><br>
        ${formatRp(i.price)} × ${i.qty}
      </div>
    </div>
  `).join("") || "<p>Keranjang masih kosong</p>";
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.cat);
  });
});

document.getElementById("cartBtn").addEventListener("click", () => {
  document.getElementById("cartSidebar").classList.toggle("open");
});
document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartSidebar").classList.remove("open");
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

renderProducts();
updateCart();
