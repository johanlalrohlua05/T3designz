let products = JSON.parse(localStorage.getItem("image")) || [
    { id: 1, name: "T-Shirt", price: 850, image: "C:\Users\MY PC\OneDrive\Desktop\New folder\image\tshirt.jpg" },
    { id: 2, name: "Hoodie", price: 1200, image: "C:\Users\MY PC\OneDrive\Desktop\New folder\image\hoodie.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* PAGE SWITCHING */
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

/* PRODUCTS */
function displayProducts() {
    let container = document.getElementById("productList");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    Quantity:
                    <input type="number" id="qty-${product.id}" class="qty-input" value="1" min="1">
                    <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

/* CART */
function addToCart(id) {
    let qty = parseInt(document.getElementById(`qty-${id}`).value);
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    alert("Item added to cart");
}

function displayCart() {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    let total = 0;

    for (let id in cart) {
        let product = products.find(p => p.id == id);
        let subtotal = product.price * cart[id];
        total += subtotal;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${product.name}</strong><br>
                    ₹${product.price}
                </div>
                <div class="cart-controls">
                    <button onclick="decrease(${id})">-</button>
                    ${cart[id]}
                    <button onclick="increase(${id})">+</button>
                </div>
                <div>
                    ₹${subtotal}
                </div>
            </div>
        `;
    }

    if (total > 0) {
        cartDiv.innerHTML += `
            <div class="total-box">
                Total: ₹${total}
                <br>
                <button class="checkout-btn" onclick="checkout()">Checkout</button>
            </div>
        `;
    }
}

function increase(id) {
    cart[id]++;
    saveCart();
    displayCart();
}

function decrease(id) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    displayCart();
}

function checkout() {
    alert("Order Placed Successfully!");
    cart = {};
    saveCart();
    displayCart();
}

/* ADMIN */
function addProduct() {
    let name = document.getElementById("adminName").value;
    let price = parseFloat(document.getElementById("adminPrice").value);
    let image = document.getElementById("adminImage").value;

    let newProduct = {
        id: products.length + 1,
        name,
        price,
        image
    };

    products.push(newProduct);
    saveProducts();
    displayProducts();

    alert("Product Added Successfully!");
}

/* LOAD */
window.onload = function () {
    displayProducts();
    displayCart();
};
