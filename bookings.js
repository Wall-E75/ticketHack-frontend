console.log('bookings')
const containerDomElement = document.querySelector('.container');
const noBookDomElement = document.querySelector('.no-booking');
const bookDivELem = document.createElement('div');
bookDivELem.setAttribute('class', 'booking');

const booksData = async () => { //on recupere les reservation du panier de la page cart qui se trouve dans la base de donnée bookings
    try {
        const response = await fetch('https://ticket-hack-backend-five.vercel.app/bookings');
        const data = await response.json();
        console.log('Bookings data =>', data)
        if (data) {
            noBookDomElement.style.display = 'none';
            bookDivELem.style.display = 'flex';
        }
        return data.books;

    } catch (error) {
        console.error('error');
    }
   
};

const showBooking = async () => {
    try {
        const books = await booksData();
        if (books) {
            for (let i = 0; i< books.length; i ++) {
                let date = new Date(books[i].date);
                let heure = date.getHours();
                let minute = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes();
                let timesBefore = date.getTime() - Date.now();
                timesBefore = Math.floor(timesBefore / 60000);
                let hoursBefore = Math.floor(timesBefore / 60);
                let minutesBefore = timesBefore % 60;
                let timeRemaining = `${hoursBefore}h ${minutesBefore}m`;
                console.log('Date now =>', Date.now());
                console.log('timesBefore', timesBefore);
                console.log('heure =>', heure);
                console.log('date =>', date);
                console.log('minute =>', minute);
                console.log("id =>", books[i]._id)
                
                bookDivELem.innerHTML = `
                <h2 class="book-title">My bookings</h2>
                <div class="book-list" data-id="${books[i]._id}">
                    <span>${books[i].departure} > ${books[i].arrival}</span> <span>${heure}:${minute}</span> <span><span class="spanPrice">${books[i].price}</span>€</span> <span>Départure in ${timeRemaining}</span>
                </div>
                <p class="book-text">Enjoy your travel with TicketHack</p>
                `
                console.log('Récup =>', books[i])
            }
            console.log('pas de recup')
            
        }
        console.log('données show =>', books)
        containerDomElement.appendChild(bookDivELem)

    } catch(error) {
        console.error('no data')
    }

    
}

showBooking()
