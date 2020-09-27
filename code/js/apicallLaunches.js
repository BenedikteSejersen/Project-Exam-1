const urlLatestLaunch = "https://api.spacexdata.com/v3/launches/latest";
const urlNextLaunch = "https://api.spacexdata.com/v3/launches/next";
const urlLaunch = "https://api.spacexdata.com/v3/launches";
const urlUpcomingLaunch = "https://api.spacexdata.com/v3/launches/upcoming";
const urlPastLaunch = "https://api.spacexdata.com/v4/launches/past";

async function callSpacexLaunches () {
    try {
        const response = await fetch(urlLatestLaunch);
        const json = await response.json();

        const response2 = await fetch(urlNextLaunch);
        const json2 = await response2.json();

        const response3 = await fetch(urlUpcomingLaunch);
        const json3 = await response3.json();

        const response4 = await fetch(urlPastLaunch);
        const json4 = await response4.json();

        const response5 = await fetch(urlLaunch);
        const json5 = await response5.json();


        launchesValue(json, json2, json3, json4, json5);
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
}

callSpacexLaunches ();

function launchesValue (latest,next,upcoming,past,all) {

    // Latest

    let latestDate = new Date(latest.launch_date_utc);
    let latestDateLocal = latestDate.toDateString();
    let latestDateLocalTime = latestDate.toLocaleTimeString();

    const latestNameLink = document.querySelector("#latest-name-link");
    latestNameLink.innerHTML = `<a class="launch__name--link" href="${latest.links.wikipedia}">${latest.mission_name}</a>`;

    const latestName = document.querySelector("#latest-name");
    latestName.innerHTML = `<p class="launch___name--p">${latest.mission_name}</p>`;
    
    const latestLaunchDate = document.querySelector("#latest-date"); 
    latestLaunchDate.innerHTML = latestDateLocal + ' ' + latestDateLocalTime; 

    const latestDetails = document.querySelector("#latest-details")
    latestDetails.innerHTML = latest.details;

    let iframeHTML = "";
    const iframeContainer = document.querySelector("#latest__iframe-container");
    iframeHTML += 
    `
    <iframe src="https://www.youtube.com/embed/${latest.links.youtube_id}" frameborder="0"></iframe> 
    `;
    iframeContainer.innerHTML = iframeHTML;

    const latestButtonContainer = document.querySelector("#latest__button-container")
    latestButtonContainer.innerHTML = `<a href="${latest.links.article_link}" class="secondary-button latest-next-btn">Find out more</a>`;
    
    if (latest.links.article_link === null) {
        latestButtonContainer.style.display = "none";
    } else {
        latestButtonContainer.style.display = "block";
    }

    // Next

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

    let nextDate = new Date(next.launch_date_utc); 
    let nextDateLocal = nextDate.toDateString();
    let nextDateLocalTime = nextDate.toLocaleTimeString();

    const nextNameLink = document.querySelector("#next-name-link");
    nextNameLink.innerHTML = `<a class="launch__name--link" href="${next.links.wikipedia}">${next.mission_name}</a>`;

    const nextName = document.querySelector("#next-name");
    nextName.innerHTML = `<p class="launch___name--p">${next.mission_name}</p>`;

    const nextLaunchingDate = document.querySelector("#next-launch-date");
    nextLaunchingDate.innerHTML = nextDateLocal + ` ` + nextDateLocalTime; 

    const nextDetails = document.querySelector("#next-details");
    nextDetails.innerHTML = next.details;

    const nextButtonContainer = document.querySelector("#next__button-container");
    nextButtonContainer.innerHTML = `<a href="${next.links.article_link}" class="secondary-button latest-next-btn">Find out more</a>`;

    if (next.links.article_link === null) {
        nextButtonContainer.style.display = "none";
    } else {
        nextButtonContainer.style.display = "block";
    }

    // READ MORE

        // LATEST
        document.querySelector("#information__rocket-latest").innerText = `${latest.rocket.rocket_name}`;
        
        if (latest.links.wikipedia === null) {
                document.querySelector("#information__payload-latest").innerText = `${latest.rocket.second_stage.payloads[0].payload_id}`;
            } else {
                document.querySelector("#information__payload-latest").innerHTML = `<a href="${latest.links.wikipedia}" class="information__links">${latest.rocket.second_stage.payloads[0].payload_id}</a>`;
            }
        
        document.querySelector("#information__nationality-latest").innerText = `${latest.rocket.second_stage.payloads[0].nationality}`;

        // NEXT
        document.querySelector("#information__rocket-next").innerText = `${next.rocket.rocket_name}`;
        
        if (next.links.wikipedia === null) {
                document.querySelector("#information__payload-next").innerText = `${next.rocket.second_stage.payloads[0].payload_id}`;
            } else {
                document.querySelector("#information__payload-next").innerHTML = `<a href="${next.links.wikipedia}" class="information__links">${next.rocket.second_stage.payloads[0].payload_id}</a>`;
            }
        
        document.querySelector("#information__nationality-next").innerText = `${next.rocket.second_stage.payloads[0].nationality}`;


    // Upcoming

    let upcomingHTML = "";
    const upcomingContainer = document.querySelector("#upcoming");

    for (let i=0; i < upcoming.length; i++) {
        let upcomingDate = new Date(upcoming[i].launch_date_utc); 
        let upcomingDateLocal = upcomingDate.toDateString();
        let upcomingDateLocalTime = upcomingDate.toLocaleTimeString();

        upcomingHTML += 
        `   <tr>
                <td class="launch__border-right">${upcoming[i].mission_name}</td>
                <td class="launch__border-right">${upcomingDateLocal}</td>
                <td class="td__link"><a href="details-launches-upcoming.html?flight_number=${upcoming[i].flight_number}" class="launch-value secondary-button">Details <span class="launches__link--arrow">&#8250;</span></a></td>
            </tr>
        `;
        upcomingContainer.innerHTML = upcomingHTML;
    };
    
    // Past

    let pastHTML = "";
    const pastContainer = document.querySelector("#past");

    for (let i=0; i < past.length; i++) {
        let pastDate = new Date(past[i].date_utc); 
        let pastDateLocal = pastDate.toDateString();
        let pastDateLocalTime = pastDate.toLocaleTimeString();

        pastHTML += 
        `   <tr>
                <td class="launch__border-right">${past[i].name}</td>
                <td class="launch__border-right">${pastDateLocal}</td>
                <td class="td__link"><a href="details-launches-past.html?flight_number=${past[i].flight_number}" class="launch-value secondary-button">Details <span class="launches__link--arrow">&#8250;</span></a></td>
            </tr>
        `;
        pastContainer.innerHTML = pastHTML;
    };

    // ERROR placeholders

    if (next.links.wikipedia === null)  {
        nextNameLink.style.display ="none";
        nextName.style.display ="visible";
    } else {
        nextNameLink.style.display="visible";
        nextName.style.display ="none";
    }

    if (latest.links.wikipedia === null)  {
        latestNameLink.style.display ="none";
        latestName.style.display ="visible";
    } else {
        latestNameLink.style.display="visible";
        latestName.style.display ="none";
    }

    if (latest.details === null) {
        latestDetails.style.display = "none";
        document.querySelector("#latest__description--details").innerHTML = "There is no details about this mission.";
    } else {
        latestDetails.style.display = "visible";
    }

    if (latest.links.youtube_id === null) {
        iframeContainer.style.display = "none";
    } else {
        iframeContainer.style.display = "block";
    }

    if (next.details === null) {
        nextDetails,style.display ="none"; 
        document.querySelector("#next__description--details").innerHTML = "There is no details about this mission.";
    } else { 
        nextDetails.style.display = "visible";
    }
}