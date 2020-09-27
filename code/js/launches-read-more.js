function findOutMoreBtn() {
    const nextBtn = document.querySelector("#find-more-btn-next");
    const nextMoreContainer = document.querySelector("#information-next");
 
    if (nextMoreContainer.style.display === "flex") {
        nextBtn.innerHTML = "FIND OUT MORE";
        nextMoreContainer.style.display = "none";
    } else {
        nextBtn.innerHTML = "CLOSE";
        nextMoreContainer.style.display = "flex";
    }

    const latestBtn = document.querySelector("#find-more-btn-latest");
    const latestMoreContainer = document.querySelector("#information-latest");

    if (latestMoreContainer.style.display === "flex") {
        latestBtn.innerHTML = "FIND OUT MORE";
        latestMoreContainer.style.display = "none";
    } else {
        latestBtn.innerHTML = "CLOSE";
        latestMoreContainer.style.display = "flex";
    }
   
}