 //Utilisation de variables pour les relations input
 const departInputElement = document.querySelector('#departure');
 const arrivalInputElement = document.querySelector('#arrival');
 const dateInputElement = document.querySelector('#date');

document.querySelector('#btn-search').addEventListener('click', ()=> {
    //relation avec la partie affichage
    
    const notfoundImg = 'notfound';
    
    if (!departInputElement.value || !arrivalInputElement.value || ! dateInputElement.value) {    
        document.querySelector('#resa-output').innerHTML = `
            <div id="default-output">
                <img class="mini-train" src="./images/${notfoundImg}.png">
                <p>No trip found</p>
            </div>
        `
        return;
    }
    fetch(`https://ticket-hack-backend-five.vercel.app/trips/${departInputElement.value}/${arrivalInputElement.value}/${dateInputElement.value}`)
    .then(response => response.json())
    .then(data => {
        let trip = data.trip   
        if(data.result) {
            const defaultOutputElem = document.querySelector('#default-output');
            defaultOutputElem.style.display = "none";
            for (let i = 0; i < trip.length; i++) {
                //Changement du type de la date (qui est en string) en objet date
                const dateString = trip[i].date;
                const dateObj = new Date(dateString);
                const heure = dateObj.getHours();
                const minute = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
                document.querySelector('#resa-output').innerHTML += `
               <div id="book-output">
                    <p>${trip[i].departure} > ${trip[i].arrival} ${heure}:${minute} ${trip[i].price}€</p>
                    <button id="${trip[i]._id}"class="btn btn-book">Book</button>                    
                </div>

            `
                
            }
            addBook();
            deleteBook()
            
        } 
    //     document.querySelector('#resa-output').innerHTML = `
    //         <div id="default-output">
    //             <img class="mini-train" src="./images/${notfoundImg}.png">
    //             <p>It's time to book your future trip</p>
    //         </div>
    //     `
     
})
    searchReload();
   
})
/**
 * Fonction pour rajouter un book dans notre collection cart
 */
function addBook() {
    for (let i =0; i < document.querySelectorAll('.btn-book').length; i++) {
        document.querySelectorAll('.btn-book')[i].addEventListener('click', function () {
            fetch(`https://ticket-hack-backend-five.vercel.app/carts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: this.id}),
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        window.location.assign('./cart.html');
                        return
                    }
                    
                })
                

        })
       

    }
    document.querySelector('#default-output').style.display = "flex";

    
}

function deleteBook() {
    departInputElement.value = ''
    arrivalInputElement.value = ''
    dateInputElement.value = ''
}

function searchReload() {
    fetch(`https://ticket-hack-backend-five.vercel.app/trips/${departInputElement.value}/${arrivalInputElement.value}/${dateInputElement.value}`)
    .then(response => response.json())
    .then(data => {
        let trip = data.trip   
        if(data.result) {
            const defaultOutputElem = document.querySelector('#default-output');
            defaultOutputElem.style.display = "none";
            for (let i = 0; i < trip.length; i++) {
                //Changement du type de la date (qui est en string) en objet date
                const dateString = trip[i].date;
                const dateObj = new Date(dateString);
                const heure = dateObj.getHours();
                const minute = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
                document.querySelector('#resa-output').innerHTML += `
               <div id="book-output">
                    <p>${trip[i].departure} > ${trip[i].arrival} ${heure}:${minute} ${trip[i].price}€</p>
                    <button id="${trip[i]._id}"class="btn btn-book">Book</button>                    
                </div>

            `
                
            }
            addBook();
            deleteBook()
            
        } 
    //     document.querySelector('#resa-output').innerHTML = `
    //         <div id="default-output">
    //             <img class="mini-train" src="./images/${notfoundImg}.png">
    //             <p>It's time to book your future trip</p>
    //         </div>
    //     `
     
})
}