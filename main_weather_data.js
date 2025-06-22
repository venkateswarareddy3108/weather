
// finding the geographical location of the user's device by geolocation API

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(`Latitude:${latitude},Longitude:${longitude}`)

        // if the location found calling get_weather_by_location function to show the data in the page
        get_Weather_by_location(latitude, longitude)

        //add city to the display city box
        

    },
        (error) => {
            console.error("geolocation error:", error.message)
            alert("location access denied (or) difficulty in fetching.... please search by City")
        }
    );
}
else {
    alert("Geolocation is not supported by this browser (or) difficulty in fetching... Please search by City")
}

// If the geo-location didn't found  the weather data by location
let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let city = document.getElementById("input_value").value.trim();
    document.getElementById("locate").innerHTML = `<strong>${city}</strong>`

    // fetching latitude and longitude by cuty name through API city
    fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let latitude = data[0].lat
            let longitude = data[0].lon
            get_Weather_by_city(latitude, longitude)
        })
        .catch((error) => console.error("Error:", error));
});


// fetching weather API by location by get_Weather_by_location function
function get_Weather_by_location(latitude, longitude) {
    fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation,surface_pressure,cloudcover&timezone=auto`
)
        .then((response) => response.json())
        .then((data) => {
            searchcity(latitude,longitude)
            get_Weather(data)

        })
        .catch((error) => console.error("Error in fetching the weather:", error));
}


// fetching weather API by location by get_Weather_by_city function
function get_Weather_by_city(latitude, longitude) {
    fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation,surface_pressure,cloudcover&timezone=auto`
)
        .then((response) => response.json())
        .then((data) => {
            get_Weather(data)

            // showing city name searched in the loaction block
            let main_location_display = document.getElementById("main_location_display")
            main_location_display.style.display = "block"
            document.getElementById(
                "main_location_display"
            ).innerHTML = `<strong>${input_value.value}</strong>`;
        })
        .catch((error) => console.error("Error in fetching the weather:", error));
}



// function to grab the data from API

function get_Weather(data) {
    console.log(data);

    //adding data to the Weather conditions
    document.getElementById(
        "temp"
    ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
    document.getElementById(
        "humidity"
    ).innerHTML = `<strong>${data.hourly.relative_humidity_2m[0]}(g/m^3)</strong>`;
    document.getElementById(
        "cloudcover"
    ).innerHTML = `<strong>${data.hourly.cloudcover[0]}</strong>`;
    document.getElementById(
        "feels_like"
    ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
    document.getElementById(
        "last_updated"
    ).innerHTML = `<strong>${data.current_weather.time}</strong>`;



    //adding data to the Geographical Location
    document.getElementById(
        "time_abbr"
    ).innerHTML = `<strong>${data.timezone_abbreviation}</strong>`;
    document.getElementById(
        "weath_code"
    ).innerHTML = `<strong>${data.current_weather.weathercode
    }</strong>`;
    document.getElementById(
        "lat"
    ).innerHTML = `<strong>${data.latitude}°</strong>`;
    document.getElementById(
        "lon"
    ).innerHTML = `<strong>${data.longitude}°</strong>`;


    //adding data to the Atmospheric wind data
    document.getElementById(
        "wind_speed"
    ).innerHTML = `<strong>${data.current_weather.windspeed}km/h</strong>`;
    document.getElementById(
        "precip"
    ).innerHTML = `<strong>${data.hourly.precipitation[0]}mm</strong>`;
    document.getElementById(
        "pressure"
    ).innerHTML = `<strong>${data.hourly.surface_pressure[0]}mb</strong>`;
    document.getElementById(
        "wind_dirc"
    ).innerHTML = `<strong>${data.current_weather.winddirection}</strong>`;
    document.getElementById(
        "wind_chill"
    ).innerHTML = `<strong>${data.current_weather.windspeed}°C</strong>`;



    //calling functions for  background image depending upon the cloud cover and time
    change_bg_image(data)

}

//function to show the location name in the main location block
function searchcity(latitude, longitude) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {console.log(data.city)
        let main_location_display = document.getElementById("main_location_display")
            main_location_display.style.display = "block"
            document.getElementById(
                "main_location_display"
            ).innerHTML = `<strong>${data.city}</strong>`
            document.getElementById(
                "locate"
            ).innerHTML = `<strong>${data.city}</strong>`
    })
    .catch((error) => console.error("Error:", error));
}

// function to change the background image  depends upon the cloud cover
function change_bg_image(data) {

    let updated_time = data.current_weather.time //its in form of  2025-03-05 18:30
    let time = parseInt(updated_time.split("T")[1].split(":")[0]) // take time out of the string

    if ((time <= 6 || time >= 18) && (data.hourly.relative_humidity_2m[0] <= "27" || data.hourly.relative_humidity_2m[0] <= "22")) {
        document.body.style.backgroundImage = 'url("./images/night.jpg")';
    }
    else if ((time <= 6 || time >= 18) && (data.hourly.relative_humidity_2m[0] >= "15" || data.hourly.relative_humidity_2m[0] <= "22")) {
        document.body.style.backgroundImage = 'url("./images/night.jpg")';
    }

    else if (data.hourly.relative_humidity_2m[0] >= "22") {
        document.body.style.backgroundImage = 'url("./images/sunny.jpg")';

    }
    else if (data.hourly.relative_humidity_2m[0] >= "22") {
        document.body.style.backgroundImage = 'url("./images/rainy.jpg")';

    }
    else if (data.hourly.relative_humidity_2m[0] <= "15") {
        document.body.style.backgroundImage = 'url("./images/Partly cloudy.jpg")';

    }
    else if (data.hourly.relative_humidity_2m[0] == "22") {
        document.body.style.backgroundImage = 'url("./images/clear.jpg")';

    }
    else if (data.hourly.relative_humidity_2m[0] <= "0") {
        document.body.style.backgroundImage = 'url("./images/stroms.jpg")';

    }
    else {
        document.body.style.backgroundImage = 'url("./images/else_bg.jpg")';

    }

}

