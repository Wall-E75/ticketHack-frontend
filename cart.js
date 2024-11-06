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
        let deleteCart = document.getElementById('deletCart');
        console.log(data.Cart[i])       
        travelDomElem.innerHTML += `
        <div id="cart-list">
            <span>${data.Cart[i].departure} > ${data.Cart[i].arrival}</span> <span>${heure} : ${minute}</span> <span id="spanPrice">${data.Cart[i].price}€</span>
            <button id="${deleteCart}" class='btn btn-delete'>X</button>
        </div>
    `
    console.log(document.querySelectorAll('#spanPrice').length)
    let totalPrice = 0
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
})


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
  