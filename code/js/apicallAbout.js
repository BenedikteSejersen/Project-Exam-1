const urlRockets = "https://api.spacexdata.com/v4/rockets";
const urlRoadster = "https://api.spacexdata.com/v4/roadster";
const urlCompanyInfo = "https://api.spacexdata.com/v4/company";
const urlDragons = "https://api.spacexdata.com/v4/dragons";

async function callAboutValue() {
    try {
        const response = await fetch(urlRockets);
        const json = await response.json();
        const response2 = await fetch(urlRoadster);
        const json2 = await response2.json();
        const response3 = await fetch(urlCompanyInfo);
        const json3 = await response3.json();

        getAboutData(json, json2, json3);
    } catch (err) {
        console.log(err);   
        
        const header = document.querySelector("header");
        header.innerHTML = `<h1>It's not you, but something went wrong!</h1>`;
        header.style.color = "red";
        header.style.fontSize = "50px";
        header.style.textAlign = "center";
        header.style.margin = "30px auto";
        header.style.position = "relative";
        header.style.top = "100px";
    } 
}

callAboutValue();

function getAboutData(rockets, roadster, company) {

    // about
     document.querySelector("#about__p-text").innerText = `${company.summary}`;

    // roadster
    document.querySelector("#roadster__h2").innerText = `${roadster.name}`;

    document.querySelector("#roadster__p").innerText = `${roadster.details}`;

    // rockets
    const rocketsContainer = document.querySelector("#rockets-container");
    let HTML = "";
    for (i = 0; i < rockets.length; i ++) {
        HTML += 
        `
        <div class="rockets__box-container">
            <img src="${rockets[i].flickr_images[0]}" alt="rocket launching" class="rockets__box--img">
            <h5>${rockets[i].name}</h5>
            <p class="rockets__box--p">${rockets[i].description}</p>
            <div class="rockets__box--a-container">
                <a href="${rockets[i].wikipedia}" class="secondary-button rockets__box--a">Go to wikipedia</a>
            </div>
        </div>
        `;
        rocketsContainer.innerHTML = HTML;
    }
}