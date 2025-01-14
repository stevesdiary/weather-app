let weather = {
   apiKey: process.env.OPEN_WEATHERAPI_KEY,
   fetchWeather: function (city) {
      fetch(
         "https://api.openweathermap.org/data/2.5/weather?q=" +
         city +
         "&units=metric&appid=" +
         this.apiKey
      )
         .then((response) => {
         if (!response.ok) {
            alert("No weather found, type your city.");
            throw new Error("No weather found.");
         }
         return response.json();
         })
         .then((data) => this.displayWeather(data));
   },
   displayWeather: function (data) {
      // console.log(data)
      let { name, wind, weather, sys, main } = data;
      let { description, icon } = weather[0];
      let { country, city } = sys;
      let { temp, humidity } = main
      let { speed } = wind;
      const F = temp * 9/5 + 32;

      document.querySelector(".description").innerText = "Wind Speed : "+ speed + "km/hr";
      document.querySelector(".temp").innerText = "Temperature : " + temp.toFixed(1) + "°C "+ " / " + F.toFixed(1) + "°F";
      document.querySelector(".icon").src= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      document.querySelector(".description").innerText = "Description: " + description;
      document.querySelector(".city").innerText = "Weather in " + name +", " + country;
      document.querySelector(".humidity" ).innerText = "Humidity : " + humidity + "%";
      // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
      document.querySelector(".wind").innerText = "Wind Speed : "+ speed + " km/hr";
      document.querySelector(".weather").classList.remove("loading");
      
   },
   search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
   },
};

document.querySelector(".search button").addEventListener("click", function () {
   weather.search();
});


document.querySelector(".search-bar").addEventListener("keyup", function (event) {
   if (event.key == "Enter") {
      weather.search();
   }
});

weather.fetchWeather();
