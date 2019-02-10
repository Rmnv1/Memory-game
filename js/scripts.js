let cards = document.querySelectorAll('.card'),
    flippedCard = false,
    firstCard, secondCard,
    lockCard = false,
    counter = 0,
    winCounter = 0;

function flipCard() {
    if (lockCard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard) {
        firstCard = this;
        flippedCard = true;

        return;
    } else {
        secondCard = this;
        flippedCard = false;
        checkMatch();
    }

}

function checkMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    isMatch ? disableCards() : unflipCards();
    counter++;
    console.log(counter);
}

function unflipCards() {
    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        reset();
    }, 850);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.childNodes[1].style.backgroundColor = "#334F70";
    secondCard.childNodes[1].style.backgroundColor = "#334F70";
    winCounter++;
    if (winCounter === 6) {
        setTimeout(() =>{
        alert(`Всего попыток ${counter}, итоговая оценка ${rate()}`);
        }, 1000);
        
    }

    reset();
}

function reset() {
    flippedCard = false;
    lockCard = false;
    firstCard = null;
    secondCard = null;
}

function rate() {
    if (counter <= 13) {
        return 5;
    } else if (counter <= 15) {
        return 4;
    } else if (counter <= 18) {
        return 3;
    } else (counter > 19); {
        return 2;
    }
}

(function shuffle() {
    cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));