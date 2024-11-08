const travelDomElem = document.querySelector('#travel');

fetch(`http://localhost:3000/carts`)
.then(response => response.json())
.then(data => {
    //affichage heure
   
    console.log(data.Cart[0].departure)

    for (let i =0; i<data.Cart.length; i++) {
        const dateString = data.Cart[i].date;
        const dateObj = new Date(dateString);
        const heure = dateObj.getHours();
        const minute = dateObj.getMinutes() < 10 ? "0"+ dateObj.getMinutes() : dateObj.getMinutes();
        console.log(data.Cart[i])       
        travelDomElem.innerHTML += `
        <div id="cart-list">
            <span>${data.Cart[i].departure} > ${data.Cart[i].arrival}</span> <span>${heure} : ${minute}</span> <span id="spanPrice">${data.Cart[i].price}</span>€
            <button class="deleteCart btn btn-delete">X</button>
        </div>
    `

    
    // if (travelDomElem.length > 0) {
        
    //     travelDomElem.forEach(book => {
    //     totalPrice += (book.price * book.length);
    //     console.log(totalPrice)
    //   });
    // } else {
    //     console.log(totalPrice = book.price)
    // }
    
    }
   
    // console.log(data)
    deleteButton()
    totalCart();
})

function deleteButton() {
    
    const deleteButtons = document.querySelectorAll('.deleteCart');
    for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function() {
        fetch(`http://localhost:3000/carts/carts/${this.name}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.result) {
            this.parentNode.remove();
        }
    })
    
    // bookCount = document.querySelectorAll('p').length;
    // document.querySelector('#count').textContent = messagesCount;
    console.log('clique')
  })
}
}
// const totalPrice = () => {
//     let TotalPrice
//     if (products.length > 0) {
//     let totalPrice = 0;
   
//     products.forEach(book => {
//       totalPrice += (book.price * book[i]);
//     });
  
//     spanTotalPrice.textContent = totalPrice + " €";
//     }
//   }
  
//   totalPrice();
  
function totalCart() {
    let totalSpanPrice = document.querySelectorAll('#spanPrice')
    let price = 0;
    let totalPrice = 0
    if (totalSpanPrice.length > 0) {
        for (let i=0; i<totalSpanPrice.length; i++) {
            price += Number(totalSpanPrice[i].textContent)
            // console.log(price)
        }
        totalPrice = price;
        console.log(totalPrice)
       
    }
    console.log(totalPrice)
    document.querySelector('#total').textContent += totalPrice
}