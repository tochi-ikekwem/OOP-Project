
class Product {  
    constructor(id, name, price) {  
        this.id = id;  
        this.name = name;  
        this.price = price;  
    }  
}  


class ShoppingCartItem {  
    constructor(product, quantity) {  
        this.product = product;  
        this.quantity = quantity;  
    }  

    
    totalPrice() {  
        return this.product.price * this.quantity;  
    }  
}  


class ShoppingCart {  
    constructor() {  
        this.items = [];  
    }  


    addItem(product, quantity) {  
        const existingItem = this.items.find(item => item.product.id === product.id);  
        if (existingItem) {  
            existingItem.quantity += quantity; 
        } else {  
            this.items.push(new ShoppingCartItem(product, quantity));
        }  
        this.displayItems();  
    }  

    
    removeItem(productId) {  
        this.items = this.items.filter(item => item.product.id !== productId);  
        this.displayItems();  
    }  

    
    getTotal() {  
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);  
    }  

    
    displayItems() {  
        const cartItemsContainer = document.getElementById('cart-items');  
        cartItemsContainer.innerHTML = ''; 
        this.items.forEach(item => {  
            const cartItemDiv = document.createElement('div');  
            cartItemDiv.className = 'cart-item';  
            cartItemDiv.innerHTML = `  
                ${item.product.name} - Quantity: ${item.quantity}, Total Price: $${item.totalPrice()}  
                <button onclick="removeFromCart(${item.product.id})">Remove</button>  
            `;  
            cartItemsContainer.appendChild(cartItemDiv);  
        });  
        document.getElementById('total-price').innerText = `Total Price: $${this.getTotal()}`;  
    }  
}  


const cart = new ShoppingCart();  


function addToCart(id, name, price) {  
    const product = new Product(id, name, price);  
    cart.addItem(product, 1); 
}  


function removeFromCart(productId) {  
    cart.removeItem(productId);  
}