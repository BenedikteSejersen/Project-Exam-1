const nextUrl = "https://api.spacexdata.com/v4/launches/next";

async function nextApi() {
    try {
        const repsonse = await fetch(nextUrl);
        const json = await repsonse.json();

        nextApiInfo(json);
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

nextApi();

function nextApiInfo(next) {

    let nextDate = new Date(next.date_utc); 
    let nextDateLocal = nextDate.toDateString();
    let nextDateLocalTime = nextDate.toLocaleTimeString();

    const nextName = document.querySelector("#next-launch__p-name");
    nextName.innerText = `${next.name}`;

    const nextLaunchDate = document.querySelector("#next-launch__p-launch-date");
    nextLaunchDate.innerText = `${nextDateLocal} ${nextDateLocalTime}`;
}
