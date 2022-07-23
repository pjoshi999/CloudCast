const city = document.querySelector(".city");
const input = document.querySelector("#input");
const temp = document.querySelector(".temp");
const time = document.querySelector(".time");
const localDate = document.querySelector(".local-date");
const condition = document.querySelector(".condition");
const submit = document.querySelector(".submit");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");
const visibility = document.querySelector(".visibility");
const description = document.querySelector(".description");
const icon = document.querySelector(".icon");
const cities = document.querySelectorAll(".active");
const background = document.querySelector(".weather-app");
const container = document.querySelector(".container");
const hide = document.querySelectorAll(".hide");
const form = document.querySelector("#form");
const tempSwitch = document.querySelector(".switch");
const indicator = document.querySelector(".indicator");
const convert = document.querySelectorAll(".convert");
const fTemp = document.querySelectorAll(".f-temp");
const brand = document.querySelector(".brand");

function getLocalTime(data) {
  let date = new Date();
  let time = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = time + localOffset;
  let localTime = utc + 1000 * data;
  let localTimeDate = new Date(localTime);
  return localTimeDate.toString();
}

let searchValue = "London";
async function getWeather(searchValue) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=68a2f15daa8c13a3af2c56dc405e9e57`
  );
  const data = await response.json();

  city.innerHTML =
    data["name"] +
    ", " +
    `<small><small><small>${data["sys"]["country"]}</small></small></small>`;
  temp.innerHTML = Math.round(data["main"]["temp"]);
  temp.append(String.fromCodePoint(176) + "C");
  time.innerHTML = getLocalTime(data["timezone"]).slice(16, 21);

  if (getLocalTime(data["timezone"]).slice(0, 3) === "Mon") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "day" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Tue") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "sday" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Wed") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "nesday" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Thu") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "rsday" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Fri") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "day" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Sat") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "urday" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }
  if (getLocalTime(data["timezone"]).slice(0, 3) === "Sun") {
    localDate.innerHTML =
      getLocalTime(data["timezone"]).slice(0, 3) +
      "day" +
      ", " +
      getLocalTime(data["timezone"]).slice(8, 10) +
      " " +
      getLocalTime(data["timezone"]).slice(4, 7);
  }

  icon.src = `http://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png`;
  condition.innerHTML = data["weather"][0]["main"];
  cloud.innerHTML = data["clouds"]["all"] + `%`;
  humidity.innerHTML = data["main"]["humidity"] + `%`;
  wind.innerHTML = data["wind"]["speed"] + `km/hr`;
  pressure.innerHTML = data["main"]["pressure"] + `mb`;
  minTemp.innerHTML = data["main"]["temp_min"] + `&#x2103;`;
  maxTemp.innerHTML = data["main"]["temp_max"] + `&#x2103;`;
  visibility.innerHTML = data["visibility"] / 1000 + `km`;
  description.innerHTML = data["weather"][0]["description"];

  container.style.opacity = "1";

  if (data["weather"][0]["main"] == "Clouds") {
    background.style.background = "url(./images/cloudy.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
  if (data["weather"][0]["main"] == "Clear") {
    background.style.background = "url(./images/clear.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
  if (
    data["weather"][0]["main"] == "Rain" ||
    data["weather"][0]["main"] == "Drizzle"
  ) {
    background.style.background = "url(./images/rain.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
  if (
    data["weather"][0]["main"] == "Fog" ||
    data["weather"][0]["main"] == "Mist" ||
    data["weather"][0]["main"] == "Smoke" ||
    data["weather"][0]["main"] == "Haze"
  ) {
    background.style.background = "url(./images/fog_mist.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
  if (data["weather"][0]["main"] == "Snow") {
    background.style.background = "url(./images/snow.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
  if (data["weather"][0]["main"] == "Thunderstorm") {
    background.style.background = "url(./images/thunderstorm.jpg)";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }

  tempSwitch.onclick = function () {
    tempSwitch.classList.toggle("change");
    indicator.classList.toggle("change");
    if (indicator.classList.contains("change")) {
      temp.innerHTML = Math.round(temp.innerText.slice(0, temp.innerText.length - 2));
      minTemp.innerHTML = minTemp.innerText.slice(0, minTemp.innerText.length - 2);
      maxTemp.innerHTML = maxTemp.innerText.slice(0, maxTemp.innerText.length - 2);
      temp.innerHTML = Math.round(toFahrenheit(temp.innerHTML));
      minTemp.innerHTML = toFahrenheit(minTemp.innerHTML).toPrecision(4);
      maxTemp.innerHTML = toFahrenheit(maxTemp.innerHTML).toPrecision(4);
      temp.append(String.fromCodePoint(176) + "F");
      minTemp.append(String.fromCodePoint(176) + "F");
      maxTemp.append(String.fromCodePoint(176) + "F");
    } else {
      temp.innerHTML = Math.round(temp.innerText.slice(0, temp.innerText.length - 2));
      minTemp.innerHTML = minTemp.innerText.slice(0, minTemp.innerText.length - 2);
      maxTemp.innerHTML = maxTemp.innerText.slice(0, maxTemp.innerText.length - 2);
      temp.innerHTML = Math.round(toCelcius(temp.innerHTML));
      minTemp.innerHTML = toCelcius(minTemp.innerHTML).toPrecision(4);
      maxTemp.innerHTML = toCelcius(maxTemp.innerHTML).toPrecision(4);
      temp.append(String.fromCodePoint(176) + "C");
      minTemp.append(String.fromCodePoint(176) + "C");
      maxTemp.append(String.fromCodePoint(176) + "C");
    }
  };
}

function toFahrenheit(num1) {
  return (num1 * 9) / 5 + 32;
}
function toCelcius(num2) {
  return ((num2 - 32) * 5) / 9;
}

form.addEventListener("submit", (e) => {
  if (input.value.length == 0) {
    alert("Please enter the name of city");
  } else {
    searchValue = input.value;
    getWeather(searchValue);
  }
  e.preventDefault();
});

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    getWeather(city.textContent);
    indicator.style.transform = "translateX(0);";
    tempSwitch.classList.remove("change");
    indicator.classList.remove("change");
  });
});
