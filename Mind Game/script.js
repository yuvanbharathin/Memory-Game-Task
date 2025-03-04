const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restart");
const icons = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝", "🍍", "🥥"];
let cards = [...icons, ...icons];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements
function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cards);
    cards.forEach(icon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.icon;
        flippedCards.push(this);
    }
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === icons.length) {
            setTimeout(() => alert("Congratulations! You won!"), 500);
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
    }
    flippedCards = [];
}

// Restart game
restartButton.addEventListener("click", () => {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
});

// Initialize game
createBoard();
