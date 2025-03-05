const travelDomElem = document.querySelector('#travel');
const btnPurcahse = document.getElementById('btn-purchase');



fetch(`http://localhost:3000/carts`)
.then(response => response.json())
.then(data => {
    //affichage heure
   
    console.log(data.Cart[0].departure)
    travelDomElem.innerHTML = '';
    let bookingIds = [];

    for (let i =0; i<data.Cart.length; i++) {
        const dateString = data.Cart[i].date;
        const dateObj = new Date(dateString);
        const heure = dateObj.getHours();
        const minute = dateObj.getMinutes() < 10 ? "0"+ dateObj.getMinutes() : dateObj.getMinutes();
        console.log("Data Cart =>",data.Cart)       
        travelDomElem.innerHTML += `
        <div class="cart-list" data-id="${data.Cart[i]._id}">
            <span>${data.Cart[i].departure} > ${data.Cart[i].arrival}</span> <span>${heure}:${minute}</span> <span><span class="spanPrice">${data.Cart[i].price}</span>€</span>
            <button class="deleteCart btn btn-delete" data-id="${data.Cart[i]._id}">X</button>
        </div>
    `
    bookingIds.push(data.Cart[i]._id);
    console.log('IDS =>',bookingIds)
    
    console.log('id =>',{id: data.Cart[i]._id})
    }
    totalCart();
    deleteButton();
    
    btnPurcahse.addEventListener('click', ()=> {
        console.log('click')
        if (bookingIds.length === 0) return alert("Votre panier est vide")
        fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ id: bookingIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                travelDomElem.textContent = '';
                document.getElementById('total').textContent = 'Total : 0€';
                window.location.href = '/bookings.html'; // Redirection après paiement
            }
        })
        
    })
    console.log('Data after purschase =>',data)
})

function deleteButton() {
    
    document.querySelectorAll('.deleteCart').forEach(button => {
        button.addEventListener('click', (event) => {
            const cartId = event.target.getAttribute('data-id');

            fetch(`http://localhodt:3000/carts/${cartId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    event.target.parentNode.remove();
                    totalCart();
                }
            })
        })

    })
   
}

function totalCart() {
    let totalSpanPrice = document.querySelectorAll('.spanPrice')
    let price = 0;
    let totalPrice = 0
    //calcule le total des books en cherchant combien de books sont disponible
    //Puis les additionne dans la variable price, puis on met à jour l'affichage
    if (totalSpanPrice.length > 0) {
        for (let i=0; i<totalSpanPrice.length; i++) {
            price += Number(totalSpanPrice[i].textContent)
            // console.log(price)
        }
        totalPrice = price;
        console.log(totalPrice)
        document.querySelector('#total').textContent = 'Total : ' + totalPrice + '€'
    } 
   
}