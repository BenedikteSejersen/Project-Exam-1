const popUp = document.querySelector(".pop-up");
const btn = document.querySelector(".pop-up__btn");

function popUpSubscribe() {
    // popUp.style.display = "block";

    if(localStorage.last) {
        if( (localStorage.last = Date.now() ) / (1000*60*60*24*2) >= 1 ) {
            popUp.style.display = "block";
            localStorage.last = Date.now();
        }
    } else {
        localStorage.last = Date.now();
        popUp.style.display = "block";
    }

    btn.addEventListener("click", function() {
        popUp.style.display = "none";
    });




    // if (localStorage.getItem(`popState`) != `shown`) {
    //     popUp.style.display = "block";
    //     localStorage.setItem(`popState`, `shown`);
    // }

    btn.addEventListener("click", function() {
        popUp.style.display = "none";
    });

}

setTimeout(popUpSubscribe, 10000);