const weather = document.querySelector(".js_weather");

const API_KEY = "e9ba762681ab8a0aa1e50fe52895b0eb";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
    )
        .then(function(response){
        return response.json();
    })
        .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C
${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        longitude,
        latitude
    };
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();