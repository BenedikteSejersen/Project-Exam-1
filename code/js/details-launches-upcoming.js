const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flightNumber = params.get("flight_number");

const url = "https://api.spacexdata.com/v3/launches/"; 
let flightNumberUrl = url + flightNumber;

async function launchDetailData() {
    try {
        const response = await fetch(flightNumberUrl);
        const json = await response.json();

        getDetailsUpcoming(json);
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

launchDetailData();

function getDetailsUpcoming(url) {
    
    // HEADER
    const header = document.querySelector("h1").innerText = `Upcoming mission: ${url.mission_name}`;

    // BREADCRUMB
    const breadcrumb = document.querySelector("#breadcrumb-details-page").innerText = `Upcoming mission: ${url.mission_name}`;

    // COUNTDOWN
    const countdown = setInterval(function()  {
        let now = new Date().getTime();
        let timeleft = upcomingDate - now;

        let day = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        document.querySelector("#day").innerHTML = day;
        document.querySelector("#hours").innerHTML = hours;
        document.querySelector("#minutes").innerHTML = minutes;
        document.querySelector("#seconds").innerHTML = seconds;

    }, 1000);

    let upcomingDate = new Date(url.launch_date_utc);
    let upcomingDateLocal = upcomingDate.toDateString();
    let upcomingDateLocalTime = upcomingDate.toLocaleTimeString();

    // LAUNCH DATE
    document.querySelector("#launch-date__date").innerText = upcomingDateLocal + ` ` + upcomingDateLocalTime;

    // INFORMATION
    document.querySelector("#information__rocket").innerText = `${url.rocket.rocket_name}`;
    
    if (url.links.wikipedia === null) {
            document.querySelector("#information__payload").innerText = `${url.rocket.second_stage.payloads[0].payload_id}`;
        } else {
            document.querySelector("#information__payload").innerHTML = `<a href="${url.links.wikipedia}" class="information__links">${url.rocket.second_stage.payloads[0].payload_id}</a>`;
        }
    
    document.querySelector("#information__nationality").innerText = `${url.rocket.second_stage.payloads[0].nationality}`;

    

    // DETAILS
    document.querySelector("#details__p").innerText = `${url.details}`;

        let detailsContainer = document.querySelector(".details-container");
        
        if (url.details === null) {
            detailsContainer.innerHTML = `<h3 class="details__h3">Details about this mission will be coming soon</h3>`;
        } else {
            detailsContainer.style.display = "visible";
        };

    // YOUTUBE
    let iframeHTML = "";
    const iframeContainer = document.querySelector(".video-container");
    iframeHTML += 
    `
    <iframe src="https://www.youtube.com/embed/${url.links.youtube_id}" frameborder="0"></iframe> 
    `;
    iframeContainer.innerHTML = iframeHTML;

        if (url.links.youtube_id === null) {
            iframeContainer.style.display = "none";
        } else {
            iframeContainer.style.display = "visible";
        }

    // OTHER WEBSITES
    


    const redditCampaign = document.querySelector(".other-container-1");
    redditCampaign.innerHTML = `<h4 class="other__h4">Reddit Campaign</h4>
                                <div class="other__a-container">
                                    <a href="${url.links.reddit_campaign}" class="secondary-button">Visit</a>
                                </div>`;
        if(url.links.reddit_campaign === null) {
            redditCampaign.style.display = "none";
        } else {
            redditCampaign.style.display = "visible";
        }

    const redditLaunch = document.querySelector(".other-container-2");
    redditLaunch.innerHTML = `<h4 class="other__h4">Reddit Launch</h4>
                                <div class="other__a-container">
                                    <a href="${url.links.reddit_launch}" class="secondary-button">Visit</a>
                                </div>`;
        if(url.links.reddit_launch === null) {
            redditLaunch.style.display = "none";
        } else {
            redditLaunch.style.display = "visible";
        }
                                                                            

    const redditRecovery = document.querySelector(".other-container-3");
redditRecovery.innerHTML = `<h4 class="other__h4">Reddit Recovery</h4>
                            <div class="other__a-container">
                                <a href="${url.links.reddit_recovery}" class="secondary-button">Visit</a>
                            </div>`;
        if(url.links.reddit_recovery === null) {
            redditRecovery.style.display = "none";
        } else {
            redditRecovery.style.display = "visible";
        }

    const redditMedia = document.querySelector(".other-container-4");
    redditMedia.innerHTML = `<h4 class="other__h4">Reddit Media</h4>
                            <div class="other__a-container">
                                <a href="${url.links.reddit_media}" class="secondary-button">Visit</a>
                            </div>`;
        if(url.links.reddit_media === null) {
            redditMedia.style.display = "none";
        } else {
            redditMedia.style.display = "visible";
        }

    const articleLink = document.querySelector(".other-container-5");
    articleLink.innerHTML = `<h4 class="other__h4">Article</h4>
                            <div class="other__a-container">
                                <a href="${url.links.article_link}" class="secondary-button">Visit</a>
                            </div>`;
        if(url.links.article_link === null) {
            articleLink.style.display = "none";
        } else {
            articleLink.style.display = "visible";
        }

        const otherWebsite = document.querySelector(".other-website");
        
        if (url.links.reddit_campaign === null && url.links.reddit_launch === null && url.links.reddit_recovery === null &&
        url.links.reddit_media === null && url.links.article_link === null) {
            otherWebsite.style.display = "none";
        } else {
            otherWebsite.style.display = "visible";
        }

        document.title = `Launch mission` + ` ` + `${url.mission_name}`;
         
}