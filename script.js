let products = [
      { name: "T-Shirt", price: 850, image: "image/tshirt.jpg" },
    { name: "Hoodie", price: 1200, image: "image/hoodie.jpg" },
    { name: "Poster", price: 500, image: "image/poster.jpg" },
    { name: "Logo", price: 300, image: "image/logo.jpg" }
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
    cart.push(products[index]);
    alert("Added to cart!");
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    const totalDiv = document.getElementById('totalPrice');
    cartDiv.innerHTML = "";

    let total = 0;
    let details = "";

    cart.forEach((item, i) => {
        total += item.price;
        cartDiv.innerHTML += `
            <p>
                ${item.name} - ₹${item.price}
                <button onclick="removeFromCart(${i})">Remove</button>
            </p>
        `;
        details += `${item.name} - ₹${item.price}\n`;
    });

    totalDiv.innerText = "Total: ₹" + total;
    document.getElementById('orderDetails').value = details + `\nTotal: ₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {
    const name = document.getElementById('customerName').value;
    const address = document.getElementById('customerAddress').value;
    const phone = document.getElementById('customerPhone').value;

    if (!name || !address || !phone || cart.length === 0) {
        alert("Please fill all details and add items to cart!");
        return;
    }

    alert(`Order placed!\nName: ${name}\nTotal Items: ${cart.length}`);

    cart = [];
    displayCart();
}

// Initialize
displayProducts();
