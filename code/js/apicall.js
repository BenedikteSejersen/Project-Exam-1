const urlLatestLaunch = "https://api.spacexdata.com/v4/launches/latest";
const urlNextLaunch = "https://api.spacexdata.com/v4/launches/next";
const urlUpcomingLaunch = "https://api.spacexdata.com/v4/launches/upcoming";
const urlPastLaunch = "https://api.spacexdata.com/v4/launches/past";

const urlRockets = "https://api.spacexdata.com/v4/rockets";
const urlRoadster = "https://api.spacexdata.com/v4/roadster";
const urlCompanyInfo = "https://api.spacexdata.com/v4/company";
const urlDragons = "https://api.spacexdata.com/v4/dragons";

async function callSpacexApi () {
    try {
        const response = await fetch(urlLatestLaunch);
        const json = await response.json();
        const response2 = await fetch(urlNextLaunch);
        const json2 = await response2.json();
        const response3 = await fetch(urlUpcomingLaunch);
        const json3 = await response3.json();
        const response4 = await fetch(urlPastLaunch);
        const json4 = await response4.json();

        const response5 = await fetch(urlRockets);
        const json5 = await response5.json();
        const response6 = await fetch(urlRoadster);
        const json6 = await response6.json();
        const response7 = await fetch(urlCompanyInfo);
        const json7 = await response7.json();
        const response8 = await fetch(urlDragons);
        const json8 = await response8.json();

        // console.log(json, json2, json3, json4, json5, json6, json7);
        dataValue(json, json2, json3, json4, json5, json6, json7, json8);
    }catch (err) {
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
    // finally ;
}

callSpacexApi();

function dataValue (latest,next,upcoming,past,rockets,roadster,companyInfo) {

    let nextDate = new Date(next.date_utc);
    let nextDateLocal = nextDate.toDateString();

    const countdown = setInterval(function()  {
        let now = new Date().getTime();
        let timeleft = nextDate - now;

        let day = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        document.querySelector("#day").innerHTML = day;
        document.querySelector("#hours").innerHTML = hours;
        document.querySelector("#minutes").innerHTML = minutes;
        document.querySelector("#seconds").innerHTML = seconds;

    }, 1000);

    const nextLaunchName = document.querySelector("#section__p-up--next");
    nextLaunchName.innerHTML = '<span class="bold-date">Name:</span>' + ' ' + next.name;
    
    const nextLaunchDate = document.querySelector("#section__p-down--next");
    nextLaunchDate.innerHTML = '<span class="bold-date">Launch date:</span>' + ' ' + nextDateLocal;
}
