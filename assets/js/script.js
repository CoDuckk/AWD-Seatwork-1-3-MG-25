// Initial seat availability
let seats = {
    movie1: 10,
    movie2: 10
};

// Function to book a seat
function bookSeat(movie) {
    if (seats[movie] > 0) {
        seats[movie]--;
        document.getElementById(`seats${capitalize(movie)}`).textContent = seats[movie];

        if (seats[movie] === 0) {
            alert("No more seats available for this movie!");
            document.querySelector(`[onclick="bookSeat('${movie}')"]`).disabled = true;
        }
    }
}

// Capitalize function for dynamic ID selection
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
