import './style.css';

const search = document.getElementById('search');
const container = document.getElementById('container');

search.addEventListener("click", () => 
{
    const input = document.querySelector('input');
    getWeather(input.value);
});

async function getWeather(location)
{
    //get rid of spaces \s is for spaces, g is for global: spaces in all the string
    // "/" around the s is for a regex expression, i is for character ignore
    location = location.replace("/\s/gi", "");
    console.log(location);

    try {
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/?key=C9XSP63X6BBS2ZWP5SA46SCMS", {mode: 'cors'});
        
        //check if we got the response
        if(!response.ok)
        {
            throw new Error("Response is not okay :(");
        }
        
        const json = await response.json();
        console.log(json);
        loadContainer(json);
        return json;
    } catch (error) {
        console.log("Error: " + error);
        return null;
    }
    
}

function loadContainer(json)
{
    container.innerHTML = "";

    const header = document.createElement('h1');
    const temp = document.createElement('h3');
    const humidity = document.createElement('h3');
    const precipitation = document.createElement('h3');

    header.textContent = json.address;
    temp.textContent = "Temperature: " + json.currentConditions.temp;
    humidity.textContent = "Humidity: " + json.currentConditions.humidity;
    precipitation.textContent = "Precipitation: " + json.currentConditions.precip;

    container.appendChild(header);
    container.appendChild(temp);
    container.appendChild(humidity);
    container.appendChild(precipitation);
}