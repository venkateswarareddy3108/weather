
    //Fetching the bangalore weather data
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m,wind_direction_10m
`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        //adding data to the Weather conditions
        document.getElementById(
          "bang_temp"
        ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
        document.getElementById(
          "bang_humi"
        ).innerHTML = `<strong>${data.hourly.relative_humidity_2m[0]}(g/kg)</strong>`;
        document.getElementById(
          "bang_wind"
        ).innerHTML = `<strong>${data.current_weather.windspeed}kph</strong>`;
      })
      .catch((error) => console.error("Error:", error));
  
    //Fetchig the chennai weather data
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=13.0837&longitude=80.2702&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m,wind_direction_10m
`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        //adding data to the Weather conditions
        document.getElementById(
          "chen_temp"
        ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
        document.getElementById(
          "chen_humi"
        ).innerHTML = `<strong>${data.hourly.relative_humidity_2m[0]}(g/kg)</strong>`;
        document.getElementById(
          "chen_wind"
        ).innerHTML = `<strong>${data.current_weather.windspeed}kph</strong>`;
      })
      .catch((error) => console.error("Error:", error));
  
    ////Fetchig the mumbai weather data
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m,wind_direction_10m

`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        //adding data to the Weather conditions
        document.getElementById(
          "mum_temp"
        ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
        document.getElementById(
          "mum_humi"
        ).innerHTML = `<strong>${data.hourly.relative_humidity_2m[0]}(g/kg)</strong>`;
        document.getElementById(
          "mum_wind"
        ).innerHTML = `<strong>${data.current_weather.windspeed}kph</strong>`;
      })
      .catch((error) => console.error("Error:", error));
  
    //Fetchig the kolkata weather data
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m,wind_direction_10m

`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        //adding data to the Weather conditions
        document.getElementById(
          "kol_temp"
        ).innerHTML = `<strong>${data.current_weather.temperature}°C</strong>`;
        document.getElementById(
          "kol_humi"
        ).innerHTML = `<strong>${data.hourly.relative_humidity_2m[0]}(g/kg)</strong>`;
        document.getElementById(
          "kol_wind"
        ).innerHTML = `<strong>${data.current_weather.windspeed}kph</strong>`;
      })
      .catch((error) => console.error("Error:", error));

  