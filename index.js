var cards = document.querySelectorAll('.card');
var cardContainer = document.querySelector('.card-container');

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
});

var lastElementObserver = new IntersectionObserver(function(entries) {
    var lastCard = entries[0];
    if (lastCard.isIntersecting) {
        addMoreCards();
        lastElementObserver.unobserve(lastCard.target);
        lastElementObserver.observe(document.querySelector('.card:last-child'));
    }
});

lastElementObserver.observe(document.querySelector('.card:last-child'));

cards.forEach(function(card) {
    observer.observe(card);
});

function addMoreCards() {
    for(var i = 0; i < 5; i++) {
        let divElement = document.createElement('div');
        divElement.classList.add('card');
        divElement.classList.add('shimmer');
        observer.observe(divElement);
        cardContainer.append(divElement);
        function callingAPI(i, divElement) {
            setTimeout(function() {
                divElement.textContent = 'New Card ' + i;
                divElement.classList.remove('shimmer');
            }, 1000)
        }
        callingAPI(i, divElement);
    }
}