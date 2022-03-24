let weather = {
  apiKey: apiKey,
  fetchWeather: (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weather.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data));
  },
  displayWeather: (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "weather in " + name;
    document.querySelector(".icon").src =
      "https:openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed : " + speed + "mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/random/?${name}/?nature/,${weather.description}?auto=format&fit=fill&q=80')`;
  },
  search: () => {
    weather.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Kansas City");
