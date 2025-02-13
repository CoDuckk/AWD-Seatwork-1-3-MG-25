
let seats = {
    movie1: 10,
    movie2: 10
};


document.addEventListener("DOMContentLoaded", loadHistory);


function bookSeat(movie, movieName) {
    if (seats[movie] > 0) {
        seats[movie]--;
        document.getElementById(`seats${capitalize(movie)}`).textContent = seats[movie];

        if (seats[movie] === 0) {
            alert("No more seats available for this movie!");
            document.querySelector(`[onclick="bookSeat('${movie}', '${movieName}')"]`).disabled = true;
        }

        // Save booking history
        saveHistory(movieName);
    }
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function saveHistory(movieName) {
    let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push({
        movie: movieName,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("bookingHistory", JSON.stringify(history));
    loadHistory(); 
}


function loadHistory() {
    let historyList = document.getElementById("bookingHistory");
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    history.forEach(entry => {
        let listItem = document.createElement("li");
        listItem.textContent = `${entry.movie} - Booked on ${entry.date}`;
        historyList.appendChild(listItem);
    });
}


function clearHistory() {
    localStorage.removeItem("bookingHistory");
    loadHistory();
}
