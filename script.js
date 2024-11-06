

document.querySelector('#btn-search').addEventListener('click', ()=> {
    //Utilisation de variables pour les relations input
    const departInputElement = document.querySelector('#departure');
    const arrivalInputElement = document.querySelector('#arrival');
    const dateInputElement = document.querySelector('#date');
    console.log(departInputElement)
    //relation avec la partie affichage
    const defaultOutputElem = document.querySelector('#default-output');
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
    fetch(`http://localhost:3000/trips/${departInputElement.value}/${arrivalInputElement.value}/${dateInputElement.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data) 
        let trip = data.trip   
        if(data.result) {
            defaultOutputElem.style.display = "none";
            for (let i = 0; i < trip.length; i++) {
                //Changement du type de la date (qui est en string) en objet date
                const dateString = trip[i].date;
                const dateObj = new Date(dateString);
                const heure = dateObj.getHours();
                const minute = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
                // console.log();
                document.querySelector('#resa-output').innerHTML += `
               <div id="book-output">
                    <p>${trip[i].departure} > ${trip[i].arrival} ${heure}:${minute} ${trip[i].price}€</p>
                    <button id="${trip[i]._id}"class="btn btn-book">Book</button>                    
                </div>

            `
                
            }
            addBook();
            departInputElement.value = ''
            arrivalInputElement.value = ''
            dateInputElement.value = ''
            
        } 
    //     document.querySelector('#resa-output').innerHTML = `
    //         <div id="default-output">
    //             <img class="mini-train" src="./images/${notfoundImg}.png">
    //             <p>It's time to book your future trip</p>
    //         </div>
    //     `
    // console.log(data);
     
})
    // console.log(departInputElement, arrivalInputElement)
   
})
/**
 * Fonction pour rajouter un book dans notre collection cart
 */
function addBook() {
    for (let i =0; i < document.querySelectorAll('.btn-book').length; i++) {
        document.querySelectorAll('.btn-book')[i].addEventListener('click', function () {
            console.log('click', this.id)
            fetch(`http://localhost:3000/carts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: this.id}),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        console.log('La page change pour cart.html')
                        // window.location.assign('./cart.html');
                        return
                    }
                    
                })

        })

    }
   
    
}