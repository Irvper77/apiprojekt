
let appid = 'c3c6b24d9b6fec689858f00ba1e08ede';
let units = "imperial";
let searchmethod ;
 
function getSearchMethod(searchterm){
    if(searchterm.length == 5  && Number.parseInt(searchterm) + ''=== searchterm)
    searchmethod = 'zip';
    else
    searchmethod = 'q';
    }
        
function searchweather (searchterm) {
getSearchMethod(searchterm);
fetch(`https://api.openweathermap.org/data/2.5/weather?${searchmethod}=${searchterm}&APPID=${appid}&units=${units}`).then(result => {
return result.json();
}).then(result => {
   init(result);
})
  
}
function init (resultfromserver){
switch (resultfromserver.weather[0].main) {
   
    case 'Clear':
     document.body.style.backgroundImage = 'url("image/clear.jpeg")';
        break;

        case 'Clouds':
        document.body.style.backgroundImage = 'url("image/cloudy.jpeg")';
        break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
       document.body.style.backgroundImage = 'url("image/rain.jpeg")';
           break;

        case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("image/storm.jpeg")';
        break;
        
        case 'Snow':
        document.body.style.backgroundImage = 'url("image/snow.jpeg")';
        break;


    default:
        break;
}

let weatherDescriptionHeader = document.getElementById('weatherdescription');
let TemperatureElement = document.getElementById('temperature');
let Humidityemlement = document.getElementById('humidity');
let windspeedelement = document.getElementById('windspeed');
let cityheader = document.getElementById('cityheader');
let weathericon = document.getElementById('documenticonimg');

weathericon.src = 'http://openweathermap.org/img/w/'+ resultfromserver.weather[0].icon + '.png';
TemperatureElement.innerHTML = Math.floor(resultfromserver.main.temp)+ '&#176'
windspeedelement.innerHTML = 'winds at '+ Math.floor(resultfromserver.wind.speed)+ 'm/s';
cityheader.innerHTML = resultfromserver.name;
Humidityemlement.innerHTML = 'humidity levels at' + resultfromserver.main.humitity + '%';

}
document.getElementById('searchbutton').addEventListener('click', () => {
let searchterm = document.getElementById('searchinput').value;
if(searchterm)
searchweather(searchterm);
})
