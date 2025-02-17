// Initial Seat Availability (Seats 1-10)
let seats = {
    movie1: Array(10).fill(false),
    movie2: Array(10).fill(false)
};

// Load seat data and history on page load
document.addEventListener("DOMContentLoaded", () => {
    loadSeats();
    loadHistory();
});

// Function to load seat selection UI
function loadSeats() {
    ["movie1", "movie2"].forEach(movie => {
        let seatContainer = document.getElementById(`seats${capitalize(movie)}`);
        seatContainer.innerHTML = "";

        let bookedSeats = JSON.parse(localStorage.getItem(`${movie}Seats`)) || [];

        for (let i = 1; i <= 10; i++) {
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.textContent = i;

            if (bookedSeats.includes(i)) {
                seat.classList.add("booked");
            } else {
                seat.addEventListener("click", () => bookSeat(movie, i));
            }

            seatContainer.appendChild(seat);
        }
    });
}

// Function to book a specific seat
function bookSeat(movie, seatNumber) {
    let bookedSeats = JSON.parse(localStorage.getItem(`${movie}Seats`)) || [];

    if (!bookedSeats.includes(seatNumber)) {
        bookedSeats.push(seatNumber);
        localStorage.setItem(`${movie}Seats`, JSON.stringify(bookedSeats));

        saveHistory(movie, seatNumber);
        loadSeats();
    }
}

// Function to save booking history
function saveHistory(movie, seatNumber) {
    let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push({
        movie: capitalize(movie),
        seat: seatNumber,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("bookingHistory", JSON.stringify(history));
    loadHistory();
}

// Function to load booking history
function loadHistory() {
    let historyList = document.getElementById("bookingHistory");
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    history.forEach(entry => {
        let listItem = document.createElement("li");
        listItem.textContent = `${entry.movie} - Seat ${entry.seat} - Booked on ${entry.date}`;
        historyList.appendChild(listItem);
    });
}

// Function to clear booking history
function clearHistory() {
    localStorage.removeItem("bookingHistory");
    localStorage.removeItem("movie1Seats");
    localStorage.removeItem("movie2Seats");
    loadSeats();
    loadHistory();
}

// Function to capitalize text
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
