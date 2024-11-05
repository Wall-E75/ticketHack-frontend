

document.querySelector('#btn-search').addEventListener('click', ()=> {
    const departInputElement = document.querySelector('#departure').value;
    const arrivalInputElement = document.querySelector('#arrival').value;
    const dateInputElement = document.querySelector('#date').value;
    const defaultOutputElem = document.querySelector('#default-output');
    const notfoundImg = 'notfound'
    fetch(`http://localhost:3000/trips/${departInputElement}/${arrivalInputElement}/${dateInputElement}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.trip) 
        let trip = data.trip   
        if(data.result) {
            defaultOutputElem.style.display = "none";
            for (let i = 0; i < trip.length; i++) {
                console.log(trip[i].departure)
                document.querySelector('#resa-output').innerHTML += `
               <div id="book-output">
                    <p>${trip[i].departure}> ${trip[i].arrival} ${trip[i].date}17h11 ${trip[i].price}€</p>
                    <button id="btn-book" class="btn">Book</button>                    
                </div>
                `
            }
            
        }
    //     document.querySelector('#resa-output').innerHTML = `
    //         <div id="default-output">
    //             <img class="mini-train" src="./images/${notfoundImg}.png">
    //             <p>It's time to book your future trip</p>
    //         </div>
    //     `
    // console.log(data);
     departInputElement.value = ''
})
    // console.log(departInputElement, arrivalInputElement)
   
})
