/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let open_cards = [];

function set_action_counter_up() {
    let value = parseInt(document.getElementsByClassName("moves")[0].textContent);
    document.getElementsByClassName("moves")[0].innerHTML = value + 1;
}

function no_match() {
    let first_cart = document.getElementsByClassName(open_cards[open_cards.length - 1]);
    let second_cart = document.getElementsByClassName(open_cards[open_cards.length - 2]);

    for (let element of first_cart) {
        element.parentElement.classList.remove('open', 'show', 'match');
    }
    for (let element of second_cart) {
        element.parentElement.classList.remove('open', 'show', 'match');
    }
    open_cards.pop();
    open_cards.pop();
}

function do_match() {
    let already_opened_cards = document.getElementsByClassName(entry);
    for (let selected_entries of already_opened_cards) {
        selected_entries.parentElement.classList.add("match");
    }
}

function show_up(card_element) {
    card_element.classList.add('open', 'show');
    let clicked_class = card_element.childNodes[1].getAttribute("class").split(' ')[1];
    return clicked_class;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* reset all cards */
let reset_button = document.getElementsByClassName('restart');
reset_button[0].addEventListener('click', function (){
    let elements = document.getElementsByClassName("card");
    for (let element of elements){
        element.classList.remove('open', 'show', 'match');
    }
    open_cards = [];
}, false);

/* open card deck on click */
let classname = document.getElementsByClassName("card");
for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function (){
        set_action_counter_up();
        let clicked_class = show_up(this);
        let hit = false;

        // Iterate cards and check if match
        for (let entry of open_cards){
            if (clicked_class === entry) {
                do_match();
                hit = true;
            }
        }
        open_cards.push(clicked_class);
        
        // Cards do not match
        if (open_cards.length % 2 === 0 && hit === false){
            no_match();
        }
    }, false);
}

/*
const mainHeading = document.body.querySelectorAll('.card');

mainHeading.addEventListener('click', function () {
    console.log('The heading was clicked!');
});
*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
