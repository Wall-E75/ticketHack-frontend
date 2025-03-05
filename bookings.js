console.log('bookings')
const containerDomElement = document.querySelector('.container');
const noBookDomElement = document.querySelector('.no-booking');
const bookDivELem = document.createElement('div');
bookDivELem.setAttribute('class', 'booking');
const booksData = async () => { //on recupere les reservation du panier
    try {
        const response = await fetch('http://localhost:3000/bookings');
        const data = await response.json();
        console.log(data)
        if (data) {
            noBookDomElement.style.display = 'none';

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
                // containerDomElement.innerHTML = `
                // <div class="book-list" data-id="${books[i]._id}">
                //     <span>${books[i].departure} > ${books[i].arrival}</span> <span>${heure}:${minute}</span> <span><span class="spanPrice">${books[i].price}</span>€</span>
                // </div>
                // `
                console.log(books[i])
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
