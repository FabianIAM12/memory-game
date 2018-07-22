$(document).ready(function() {
    'use strict';

    let open_ids = [];
    let open_cards = [];
    let locked_ids = [];
    let stars = 3;
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
        'use strict';
        let fa_elements = document.querySelectorAll('body > div > ul > li > i');
        let i = 0;

        card_icons = shuffle(card_icons);
        for (let element of fa_elements) {
            element.classList.add(card_icons[i]);
            element.setAttribute("id", i);
            i += 1;
        }
        document.getElementById("timer").innerHTML = '0';
        document.getElementsByClassName("moves")[0].innerHTML = '0';
        stars = 3;
    }
    init();

    function update_stars(moves) {
        if (moves < 8) {
            stars = 3;
        } else if (moves > 8 && moves < 15){
            stars = 2;
        } else if (moves > 15 && moves < 25) {
            stars = 1;
        } else if (moves > 25) {
            stars = 0;
        }

        let i = 0;
        let star_elements = document.getElementsByClassName("fa-star");
        for (let star of star_elements) {
            if (i < stars){
                star.style.color = '#ffd700';
            } else {
                star.style.color = 'grey';
            }
            i += 1;
        }
    }

    /* initial shuffle function */
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
        update_stars(value);
    }

    /* cards do match */
    function do_match(entry) {
        let already_opened_cards = document.getElementsByClassName(entry);
        let animation_time = 750;

        for (let selected_card of already_opened_cards) {
            selected_card.parentElement.classList.add("match");
            $(selected_card.parentElement).effect("bounce", {times: 1}, animation_time);
        }
        check_win();
    }

    /* cards do not match */
    function no_match() {
        let first_cart = document.getElementById(open_ids[open_ids.length - 1]);
        let second_cart = document.getElementById(open_ids[open_ids.length - 2]);
        let animation_time = 850;

        first_cart = first_cart.parentElement;
        second_cart = second_cart.parentElement;

        first_cart.classList.add('no-match');
        second_cart.classList.add('no-match');

        open_ids = [];
        open_cards.pop();
        open_cards.pop();

        $(first_cart).effect("shake", {times: 3}, animation_time);
        $(second_cart).effect("shake", {times: 3}, animation_time);

        setTimeout(function () {
            let pos = 0;
            let id = setInterval(frame, 5);
            function frame() {
                if (pos === 180) {
                    /* go back to initial state */
                    first_cart.style.transform = "rotateY(0deg)";
                    second_cart.style.transform = "rotateY(0deg)";
                    clearInterval(id);
                } else {
                    if (pos === 90) {
                        first_cart.classList.remove('open', 'show', 'no-match');
                        second_cart.classList.remove('open', 'show', 'no-match');
                    }
                    pos += 5;
                    first_cart.style.transform = "rotateY(" + pos + "deg)";
                    second_cart.style.transform = "rotateY(" + pos + "deg)";
                }
            }
        }, animation_time);
    }

    /* show cards */
    function show_up(card_element) {
        open_ids.push(card_element.childNodes[1].getAttribute("id"));

        /* animate first move */
        if (typeof(open_ids[open_ids.length - 2]) === 'undefined') {
            let pos = 180;
            let id = setInterval(frame, 5);

            function frame() {
                if (pos === 360) {
                    clearInterval(id);
                } else {
                    if (pos === 270) {
                        card_element.classList.add('open', 'show');
                    }
                    pos += 5;
                    card_element.style.transform = "rotateY(" + pos + "deg)";
                }
            }
        } else {
            card_element.classList.add('open', 'show');
        }
        return card_element.childNodes[1].getAttribute("class").split(' ')[1];
    }

    /* reset all cards */
    let reset_button = document.getElementsByClassName('restart');
    reset_button[0].addEventListener('click', function () {
        location.reload();
    }, false);

    /* open card deck on click */
    let classname = document.getElementsByClassName("card");
    for (let i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function () {
            if (!locked_ids.includes(this.childNodes[1].getAttribute("id"))) {
                let hit = false;
                let clicked_class = show_up(this);

                /* iterate cards and check if match */
                let card_1 = open_ids[open_ids.length - 1];
                let card_2 = open_ids[open_ids.length - 2];
                for (let entry of open_cards) {
                    if (clicked_class === entry && card_1 !== card_2) {
                        do_match(entry);
                        locked_ids.push(card_1, card_2);
                        hit = true;
                    }
                }
                open_cards.push(clicked_class);

                // cards do not match
                if (open_cards.length % 2 === 0) {
                    set_action_counter_up();
                    if (hit === false) {
                        no_match();
                    }
                }
            }
        }, false);
    }

    /* timer */
    setInterval(myTimer, 1000);
    function myTimer() {
        let seconds = parseInt(document.getElementById("timer").textContent);
        document.getElementById("timer").innerHTML = seconds + 1;
    }

    /* winning function */
    function check_win() {
        console.log(locked_ids.length);
        if (locked_ids.length === 14){
            let moves_value = parseInt(document.getElementsByClassName("moves")[0].textContent);
            let seconds_value = parseInt(document.getElementById("timer").textContent);

            let winning_div = '<div class="winner-container"><div class="headline-top"><h1>Congratulations!<br> You won!</h1></div>' +
            '<div class="subheadline"><h2>With ' + moves_value + ' moves in ' + seconds_value + ' seconds and ' + stars + ' stars.<br>Woooohoooo!</h2></div>' +
            '<div class="play_again_button">Play again!</div></div>';

            let body = $('body');
            body.children().effect("puff", {percent: 100}, 650);
            body.css('background-image', 'none');

            body.append(winning_div);
            $('subheadline').show();
            $('.play_again_button').click(function() {
                location.reload();
            });
        }
    }
});