function readMoreBtn () {
    const btn = document.querySelector("#roadster__read-more--btn");
    const text = document.querySelector("#roadster__p");

    if (text.style.display === "block") {
        btn.innerHTML = "READ MORE";
        text.style.display = "none";
    } else {
        btn.innerHTML = "CLOSE";
        text.style.display ="block";
    }
}