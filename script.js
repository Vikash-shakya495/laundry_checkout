// basic fetching requirements 
const book_button = document.querySelector('#book_button');
const book_msg = document.querySelector('#book_msg');
const add_items = document.querySelector('.add_items');
const change_img = document.querySelector('.product_container');
let currentIndex = 0; // To keep track of the current product index

// timeout for the non-selecting products
book_button.addEventListener('click',() => {
    book_msg.style.display = "block";
    setTimeout(() => {
        book_msg.style.display = "none";
    }, 3000);
});

// lists of the products
const products = [
    { product: "Dry Cleaning", price: 200.00, img: "dry_cleaning.jpeg" },
    { product: "Leather & Suede Cleaning", price: 999.00 ,img: "leather_suede.jpg"},
    { product: "Ironing", price: 30.00, img: "ironing.webp" },
    { product: "Wedding Dress Cleaning", price: 2400.00, img: "wedding_dress.jpeg"},
    { product: "Wash And Fold", price: 140.00, img: "wash and fold.jpeg" },
    { product: "Stain Removal", price: 500.00, img: "stain_removal.jpg" },
    { product: "Washing Machine", price: 4000.00, img: "washing_machine.jpg" },
];

// Function to update product details
function updateProductDetails() {
    const currentProduct = products[currentIndex];
    document.querySelector('.product_name').textContent = currentProduct.product;
    document.querySelector('.product_cost').textContent = `₹${currentProduct.price.toFixed(2)}`;
    change_img.innerHTML = "";
    change_img.innerHTML = `<img src="${currentProduct.img}">`;
}

// Initial update
updateProductDetails();

// Event listener for Skip Item button
document.querySelector('.skip').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length; // Move to the next product
    updateProductDetails(); // Update displayed product
});


// Event listener for Add Item button
let place_order = document.querySelector('.place_order');
const table = document.createElement('table');
const price_increase = document.querySelector('.price_increase');

const store_amount = []; // array to store prices of the selecting products
let auto_increament = 1;
document.querySelector('.add').addEventListener('click', () => {
    const currentProduct = products[currentIndex];
    const currentPrice = parseFloat(document.querySelector('.product_cost').textContent);
    currentIndex = (currentIndex+1) % products.length;// Move to the next product
    
    updateProductDetails(); // Update displayed product
    
    // displaying the list of products from clicking on 'add item 'button
    add_items.innerHTML ="";
    add_items.style.display = "block";
    add_items.style.justifyContent = "left";
    add_items.style.flexDirection = "row";
    add_items.style.alignItems = "left";
    book_msg.style.display = "none";

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td id="sno" >${auto_increament++} </td>
        <td id="service" > ${currentProduct.product}</td> 
        <td id="price" >₹${currentProduct.price.toFixed(2)}</td>
        `;
        table.append(tr);
        add_items.appendChild(table);
        store_amount.push(currentProduct.price);
        
        // You can handle adding the current product to the cart or any other logic here
        book_button.style.display = "none";
        place_order.innerHTML = "";
        
        place_order.innerHTML = `<input type="submit" value="Book Now" id="order_button"> <p id="book_success"> 🛈 Thank you for contacting, we will get get back to you soon </p>`;
        
        let purchased = document.querySelector('#order_button');
        purchased.style.display = "block";
        const thank_you = document.querySelector('#book_success');
        
        purchased.addEventListener('click',()=>{
            thank_you.style.display = "block";
            
        });
        
        // gives total amount on price_increase paragraph
        let sum = 0;
        for(const el of store_amount){
            sum += el;
        }
        console.log(sum);
        price_increase.innerHTML = `₹${sum}.00`;
    });
    
    
    