const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => showProducts(data));
};
loadProducts();

// show details 


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product  m-3 rounded-3 shadow">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><i class="fas fa-user-alt"></i> ${product.rating.rate} <i class="fas fa-star"></i> ${product.rating.count}</p>
      
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="Details(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
const Details=(id)=>{
  
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(data=> productDetails(data))
}
const productDetails = (data) =>{
console.log(data)
  const productDetails= document.getElementById('productDetails')
  productDetails.textContent='';
  const div=document.createElement('div')
  div.className='p-5 border rounded'
  div.innerHTML=`
  <h3>${data.title}</h3>
  <img src="${data.image}" width =200px height =200px >
  <p>${data.description}</p>

  `
  productDetails.appendChild(div);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  
  updateTaxAndCharge()
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted =parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =parseFloat(grandTotal).toFixed(2);
};
