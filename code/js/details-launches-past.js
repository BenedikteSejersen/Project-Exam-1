const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flightNumber = params.get("flight_number");

const url = "https://api.spacexdata.com/v3/launches/"; 
let flightNumberUrl = url + flightNumber;

async function launchDetailData() {
    try {
        const response = await fetch(flightNumberUrl);
        const json = await response.json();

        getDetailsPast(json);
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

launchDetailData()

function getDetailsPast(past) {

    // HEADER
    const header = document.querySelector("h1").innerText = `Past mission: ${past.mission_name}`;

    // BREADCRUMB
    const breadcrumb = document.querySelector("#breadcrumb-details-page").innerText = `Past mission: ${past.mission_name}`;

    // LAUNCH/ STATIC FIRE DATE
    let pastDate = new Date(past.launch_date_utc);
    let pastDateLocal = pastDate.toDateString();
    let pastDateLocalTime = pastDate.toLocaleTimeString();

    const launchDate = document.querySelector("#launch-date__date").innerText = `${pastDateLocal}` + ` ` + `${pastDateLocalTime}`;
    const staticFireDate = document.querySelector("#launch-year__date").innerText = `${past.launch_year}`;

    // INFORMATION
    document.querySelector("#information__rocket").innerText = `${past.rocket.rocket_name}`;
    
    if (past.links.wikipedia === null) {
            document.querySelector("#information__payload").innerText = `${past.rocket.second_stage.payloads[0].payload_id}`;
        } else {
            document.querySelector("#information__payload").innerHTML = `<a href="${past.links.wikipedia}" class="information__links">${past.rocket.second_stage.payloads[0].payload_id}</a>`;
        }
    
    document.querySelector("#information__nationality").innerText = `${past.rocket.second_stage.payloads[0].nationality}`;

    // DETAILS
    document.querySelector("#details__p").innerText = `${past.details}`;

        const detailsContainer = document.querySelector(".details-container");
        
        if (past.details === null) {
            detailsContainer.innerHTML = `<h3 class="details__h3">Unfortunately there is noe description about this mission.</h3>`;
        } else {
            detailsContainer.style.display = "visible";
        }

    // YOUTUBE
    let iframeHTML = "";
    const iframeContainer = document.querySelector(".video-container");
    iframeHTML += 
    `
    <iframe src="https://www.youtube.com/embed/${past.links.youtube_id}" frameborder="0"></iframe> 
    `;
    iframeContainer.innerHTML = iframeHTML;

        if (past.links.youtube_id === null) {
            iframeContainer.style.display = "none";
        } else {
            iframeContainer.style.display = "visible";
        }

    // OTHER WEBSITES
    const redditCampaign = document.querySelector(".other-container-1");
    redditCampaign.innerHTML = `<h4 class="other__h4">Reddit Campaign</h4>
                                <div class="other__a-container">
                                    <a href="${past.links.reddit_campaign}" class="secondary-button">Visit</a>
                                </div>`;
        if(past.links.reddit_campaign === null) {
            redditCampaign.style.display = "none";
        } else {
            redditCampaign.style.display = "visible";
        }

    const redditLaunch = document.querySelector(".other-container-2");
    redditLaunch.innerHTML = `<h4 class="other__h4">Reddit Launch</h4>
                                <div class="other__a-container">
                                    <a href="${past.links.reddit_launch}" class="secondary-button">Visit</a>
                                </div>`;
        if(past.links.reddit_launch === null) {
            redditLaunch.style.display = "none";
        } else {
            redditLaunch.style.display = "visible";
        }
                                                                            

    const redditRecovery = document.querySelector(".other-container-3");
    redditRecovery.innerHTML = `<h4 class="other__h4">Reddit Recovery</h4>
                            <div class="other__a-container">
                                <a href="${past.links.reddit_recovery}" class="secondary-button">Visit</a>
                            </div>`;
        if(past.links.reddit_recovery === null) {
            redditRecovery.style.display = "none";
        } else {
            redditRecovery.style.display = "visible";
        }

    const redditMedia = document.querySelector(".other-container-4");
    redditMedia.innerHTML = `<h4 class="other__h4">Reddit Media</h4>
                            <div class="other__a-container">
                                <a href="${past.links.reddit_media}" class="secondary-button">Visit</a>
                            </div>`;
        if(past.links.reddit_media === null) {
            redditMedia.style.display = "none";
        } else {
            redditMedia.style.display = "visible";
        }

    const articleLink = document.querySelector(".other-container-5");
    articleLink.innerHTML = `<h4 class="other__h4">Article</h4>
                            <div class="other__a-container">
                                <a href="${past.links.article_link}" class="secondary-button">Visit</a>
                            </div>`;
        if(past.links.article_link === null) {
            articleLink.style.display = "none";
        } else {
            articleLink.style.display = "visible";
        }

        const otherWebsite = document.querySelector(".other-website");
        if (past.links.reddit_campaign === null && past.links.reddit_launch === null && past.links.reddit_recovery === null &&
        past.links.reddit_media === null && past.links.article_link === null) {
            otherWebsite.style.display = "none";
        } else {
            otherWebsite.style.display = "visible";
        }

    document.title = `Launch mission` + ` ` + `${past.mission_name}`;

}