// ================= PRODUCTS BY CATEGORY =================
let categories = {
  tshirts: [
    { name: "T-Shirt 1", price: 550, image: "image/T-Shirt Design/tshirt1.jpg" },
    { name: "T-Shirt 2", price: 550, image: "image/T-Shirt Design/tshirt2.jpg" },
    { name: "T-Shirt 3", price: 650, image: "image/T-Shirt Design/tshirt3.jpg" },
    { name: "T-Shirt 4", price: 650, image: "image/T-Shirt Design/tshirt4.jpg" },
    { name: "T-Shirt 5", price: 750, image: "image/T-Shirt Design/tshirt5.jpg" },
    { name: "T-Shirt 6", price: 850, image: "image/T-Shirt Design/tshirt6.jpg" }
  ],

  hoodies: [
    { name: "Hoodie 1", price: 600, image: "image/Hoodies/hoodie1.jpg" },
    { name: "Hoodie 2", price: 600, image: "image/Hoodies/hoodie2.jpg" },
    { name: "Hoodie 3", price: 700, image: "image/Hoodies/hoodie3.jpg" },
    { name: "Hoodie 4", price: 700, image: "image/Hoodies/hoodie4.jpg" },
    { name: "Hoodie 5", price: 800, image: "image/Hoodies/hoodie5.jpg" },
    { name: "Hoodie 6", price: 850, image: "image/Hoodies/hoodie6.jpg" }
  ],

  posters: [
    { name: "Poster 1", price: 350, image: "image/Poster/poster1.jpg" },
    { name: "Poster 2", price: 350, image: "image/Poster/poster2.jpg" },
    { name: "Poster 3", price: 500, image: "image/Poster/poster3.jpg" },
    { name: "Poster 4", price: 500, image: "image/Poster/poster4.jpg" },
    { name: "Poster 5", price: 450, image: "image/Poster/poster5.jpg" },
    { name: "Poster 6", price: 450, image: "image/Poster/poster6.jpg" }
  ],

  logos: [
    { name: "Logo 1", price: 300, image: "image/Logo/logo1.jpg" },
    { name: "Logo 2", price: 300, image: "image/Logo/logo2.jpg" },
    { name: "Logo 3", price: 400, image: "image/Logo/logo3.jpg" },
    { name: "Logo 4", price: 400, image: "image/Logo/logo4.png" },
    { name: "Logo 5", price: 500, image: "image/Logo/logo5.png" },
    { name: "Logo 6", price: 500, image: "image/Logo/logo6.png" }
  ],

  banners: [
    { name: "Banner 1", price: 2500, image: "image/Banner/banner1.jpg" },
    { name: "Banner 2", price: 2500, image: "image/Banner/banner2.jpg" },
    { name: "Banner 3", price: 3000, image: "image/Banner/banner3.jpg" },
    { name: "Banner 4", price: 3000, image: "image/Banner/banner4.jpg" },
    { name: "Banner 5", price: 3500, image: "image/Banner/banner5.jpg" },
    { name: "Banner 6", price: 3500, image: "image/Banner/banner6.jpg" }
  ],

  jerseys: [
    { name: "Jersey 1", price: 1500, image: "image/Jerseys/jersey1.jpg" },
    { name: "Jersey 2", price: 2500, image: "image/Jerseys/jersey2.jpg" },
    { name: "Jersey 3", price: 2500, image: "image/Jerseys/jersey3.jpg" },
    { name: "Jersey 4", price: 2500, image: "image/Jerseys/jersey4.jpg" },
    { name: "Jersey 5", price: 2500, image: "image/Jerseys/jersey5.jpg" },
    { name: "Jersey 6", price: 2500, image: "image/Jerseys/jersey6.jpg" }
  ],

  stickers: [
    { name: "Sticker 1", price: 70, image: "image/Sticker/sticker1.jpg" },
    { name: "Sticker 2", price: 70, image: "image/Sticker/sticker2.jpg" },
    { name: "Sticker 3", price: 70, image: "image/Sticker/sticker3.jpg" },
    { name: "Sticker 4", price: 70, image: "image/Sticker/sticker4.jpg" },
    { name: "Sticker 5", price: 70, image: "image/Sticker/sticker5.jpg" },
    { name: "Sticker 6", price: 70, image: "image/Sticker/sticker6.jpg" }
  ],

  polaroids: [
    { name: "Polaroid 1", price: 100, image: "image/Polaroid/polaroid1.jpg" },
    { name: "Polaroid 2", price: 120, image: "image/Polaroid/polaroid2.png" },
    { name: "Polaroid 3", price: 150, image: "image/Polaroid/polaroid3.jpg" }
  ],

  wallpapers: [
    { name: "Wallpaper Design 1", price: 5000, image: "image/Wallpaper Design/wallpaper design1.jpg" },
    { name: "Wallpaper Design 2", price: 5000, image: "image/Wallpaper Design/wallpaper design2.jpg" },
    { name: "Wallpaper Design 3", price: 5000, image: "image/Wallpaper Design/wallpaper design3.jpg" }
  ]
};

// ================= CART =================
let cart = [];

// ================= NAVIGATION =================
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// ================= LOAD CATEGORY =================
function loadCategory(categoryName) {
    const productList = document.getElementById('productList');
    productList.innerHTML = "";

    categories[categoryName].forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick='addToCart("${categoryName}", ${index})'>
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// ================= ADD TO CART =================
function addToCart(category, index) {
    let product = categories[category][index];

    let found = cart.find(item => item.name === product.name);

    if (found) {
        found.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    alert("Added to cart!");
}

// ================= DISPLAY CART =================
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

// ================= CART FUNCTIONS =================
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

// ================= ORDER =================
function placeOrder() {
    const name = document.getElementById('customerName').value;
    const address = document.getElementById('customerAddress').value;
    const phone = document.getElementById('customerPhone').value;

    if (!name || !address || !phone || cart.length === 0) {
        alert("Please fill all details and add items!");
        return;
    }

    document.getElementById('confirmMsg').innerText =
        `Thank you ${name}! Your order request has been sent.`;

    showSection('confirmSection');

    cart = [];
    displayCart();
}

// ================= WHATSAPP =================
function sendWhatsApp() {
    let name = document.getElementById('customerName').value;
    let address = document.getElementById('customerAddress').value;
    let phoneInput = document.getElementById('customerPhone').value;
    let order = document.getElementById('orderDetails').value;

    if (!name || !address || !phoneInput || !order) {
        alert("Please fill all details!");
        return;
    }

    let yourNumber = "919863311737";

    let message =
`🛒 *NEW ORDER REQUEST*

👤 Name: ${name}
📞 Phone: ${phoneInput}
📍 Address: ${address}

📦 Order:
${order}

👉 Please confirm order before payment.`;

    let url = `https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}

function payUPI() {
  let total = document.getElementById('totalPrice').innerText.replace("Total: ₹", "");
  let upiID = "ruatsangatheking@oksb";
  let url = `upi://pay?pa=${upiID}&pn=T3Designs&am=${total}&cu=INR`;
  window.location.href = url;
}

// QR Code Generator
function showQR() {
    let totalText = document.getElementById('totalPrice').innerText;

    if (!totalText || totalText === "Total: ₹0") {
        alert("Add items to cart first!");
        return;
    }

    let total = totalText.replace("Total: ₹", "").trim();
    let upiID = "ruatsangatheking@oksbi";

    let upiLink = `upi://pay?pa=${upiID}&pn=T3Designs&am=${total}&cu=INR`;

    let qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

    console.log(qrURL);

    document.getElementById('qrImage').src = qrURL;
    document.getElementById('qrSection').classList.remove('hidden');
}

// Initialize
loadCategory('tshirts');
