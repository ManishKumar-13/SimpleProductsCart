const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

let cart = {};

function addToCart(productId) {
            if (cart[productId]) {
                cart[productId]++;
            } else {
                cart[productId] = 1;
            }
            renderProducts();
            renderCart();
        }

        function removeFromCart(productId) {
            if (cart[productId]) {
                cart[productId]--;
                if (cart[productId] === 0) {
                    delete cart[productId];
                }
                renderProducts();
                renderCart();
            }
        }

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    Products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${product.name}</span>
            <span>${product.price}</span>
            <span>
                <button onclick="removeFromCart(${product.id})" ${cart[product.id] > 0 ? '' : 'disabled'}>-</button>
                <span>${cart[product.id] || 0}</span>
                <button onclick="addToCart(${product.id})">+</button>
            </span>
        `;
        productList.appendChild(li);
        console.log(li);
    });
}

window.onload = renderProducts;

function renderCart() {
    const cartDiv = document.getElementsByClassName("cart");
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    let totalPrice = 0;

    for (const productId in cart) {
        const product = Products.find(p => p.id == productId);
        const productTotalPrice = product.price * cart[productId];
        totalPrice += productTotalPrice;

        const li = document.createElement('li');
        li.innerHTML = `
        <span>${product.name}</span>
        <span>${cart[productId]} x ${product.price}</span>
        `;
        cartList.appendChild(li);
    }

    if (totalPrice === 0) {
        cartList.innerHTML = '<span style="margin-bottom: 1rem;">No Product added to the cart</span>';
        const totalPriceDiv = document.getElementById('cartTotal');
        totalPriceDiv.innerHTML = '';
    } else {
        const totalPriceDiv = document.getElementById('cartTotal');
        totalPriceDiv.innerHTML = `<strong>Total Price: ${totalPrice}</strong>`;
        cartDiv.appendChild(totalPriceDiv);
    }
}

renderCart();









