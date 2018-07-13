let open_ids = [];
let touched_ids = []
let open_cards = [];
let stars = 0;
let card_icons = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
];

function init() {
    let fa_elements = document.querySelectorAll('body > div > ul > li > i');
    let i = 0;

    card_icons = shuffle(card_icons);
    for (let element of fa_elements){
        element.classList.add(card_icons[i]);
        element.setAttribute("id", i);
        i += 1;
    }
}
init();

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

/* set counter up */
function set_action_counter_up() {
    let value = parseInt(document.getElementsByClassName("moves")[0].textContent);
    document.getElementsByClassName("moves")[0].innerHTML = value + 1;
}

/* cards do not match */
function no_match() {
    let first_cart = document.getElementById(open_ids[open_ids.length - 1]);
    let second_cart = document.getElementById(open_ids[open_ids.length - 2]);

    first_cart.parentElement.classList.add('no-match');
    second_cart.parentElement.classList.add('no-match');

    open_ids = [];
    open_cards.pop();
    open_cards.pop();

    setTimeout(function(){
        first_cart.parentElement.classList.remove('open', 'show', 'no-match');
        second_cart.parentElement.classList.remove('open', 'show', 'no-match');
    }, 600);
}

/* cards do match */
function do_match(entry) {
    let already_opened_cards = document.getElementsByClassName(entry);
    for (let selected_entries of already_opened_cards) {
        selected_entries.parentElement.classList.add("match");
    }
}

/* show cards */
function show_up(card_element) {
    open_ids.push(card_element.childNodes[1].getAttribute("id"));
    touched_ids.push(card_element.childNodes[1].getAttribute("id"));
    card_element.classList.add('open', 'show');
    return card_element.childNodes[1].getAttribute("class").split(' ')[1];
}

/* reset all cards */
let reset_button = document.getElementsByClassName('restart');
reset_button[0].addEventListener('click', function () {
    let elements = document.getElementsByClassName("card");
    for (let element of elements) {
        element.classList.remove('open', 'show', 'match');
    }
    open_cards = [];
}, false);

/* open card deck on click */
let classname = document.getElementsByClassName("card");
for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function () {
        let hit = false;
        let clicked_class = show_up(this);

        // Iterate cards and check if match
        for (let entry of open_cards) {
            if (clicked_class === entry && open_ids[open_ids.length - 1] !== open_ids[open_ids.length - 2]) {
                do_match(entry);
                hit = true;
            }
        }
        open_cards.push(clicked_class);

        // Cards do not match
        if (open_cards.length % 2 === 0) {
            set_action_counter_up();
            if (hit === false) {
                no_match();
            }
        }
    }, false);
}

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
