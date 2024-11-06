fetch(`http://localhost:3000/carts`)
.then(response => response.json())
.then(data => {
    console.log(data)
})


const totalPrice = () => {
    spanTotalPrice
    if (products.length > 0) {
    let totalPrice = 0;
   
    products.forEach(product => {
      totalPrice += (product.price * product.quantity);
    });
  
    spanTotalPrice.textContent = totalPrice + " €";
    }
  }
  
  totalPrice();
  