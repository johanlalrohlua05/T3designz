let products = [
    { name: "T-Shirt", price: 850, image: "image/tshirt.jpg" },
    { name: "Hoodie", price: 1200, image: "image/hoodie.jpg" },
    { name: "Poster", price: 500, image: "image/poster.jpg" },
    { name: "Logo", price: 300, image: "image/logo.jpg" },
    { name: "Banner", price: 3000, image: "image/banner.jpg" },
    { name: "Jersey", price: 1200, image: "image/jersey.jpg" },
    { name: "Sticker", price: 70, image: "image/sticker.jpg" },
    { name: "Polaroid", price: 120, image: "image/polaroid.jpg" },
    { name: "Wallpaper Design", price: 5000, image: "image/wallpaper design.jpg" }
];
let cart = [];

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function displayProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = "";

  products.forEach((product, index) => {
    productList.innerHTML += `
      <div class="product">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(index) {
  let found = cart.find(item => item.name === products[index].name);
  if (found) found.quantity++;
  else cart.push({ ...products[index], quantity: 1 });
  alert("Added to cart!");
}

function displayCart() {
  const cartDiv = document.getElementById('cart');
  const totalDiv = document.getElementById('totalPrice');
  cartDiv.innerHTML = "";

  let total = 0;
  let details = "";

  cart.forEach((item, i) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="60">
        <div>
          <p><b>${item.name}</b></p>
          <p>₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
          <button onclick="changeQty(${i}, -1)">-</button>
          <button onclick="changeQty(${i}, 1)">+</button>
          <button onclick="removeFromCart(${i})">Remove</button>
        </div>
      </div>
      <hr>
    `;

    details += `${item.name} x${item.quantity} = ₹${itemTotal}\n`;
  });

  totalDiv.innerText = "Total: ₹" + total;
  document.getElementById('orderDetails').value = details + `\nTotal: ₹${total}`;
}

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  displayCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

function clearCart() {
  cart = [];
  displayCart();
}

function placeOrder() {
  const name = document.getElementById('customerName').value;
  const address = document.getElementById('customerAddress').value;
  const phone = document.getElementById('customerPhone').value;

  if (!name || !address || !phone || cart.length === 0) {
    alert("Fill all details and add items!");
    return;
  }

  document.getElementById('confirmMsg').innerText = `Thank you ${name}! Your order has been placed.`;
  showSection('confirmSection');

  cart = [];
  displayCart();
}

// WhatsApp integration
function sendWhatsApp() {
  let msg = document.getElementById('orderDetails').value;
  let phone = "91XXXXXXXXXX"; // replace with your number
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// UPI payment
function payUPI() {
  let total = document.getElementById('totalPrice').innerText.replace("Total: ₹", "");
  let upiID = "yourupi@bank"; // replace
  let url = `upi://pay?pa=${upiID}&pn=T3Designs&am=${total}&cu=INR`;
  window.location.href = url;
}

// Initialize
displayProducts();
