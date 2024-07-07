const apiSecret = "14bee326c01037395e24044b7363c650";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchField = document.querySelector(".search-field input");
const searchButton = document.querySelector(".search-field button");

async function getWeatherDetails(city) {
  const trimmedCity = city.trim();
  if (trimmedCity === '') {
    displayError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(apiUrl + trimmedCity + `&appid=${apiSecret}`);
    if (!response.ok) {
      if (response.status === 400 || response.status === 404) {
        displayError("City not found. Please enter a valid city name.");
      } else {
        displayError("An error occurred. Please try again.");
      }
      return;
    }

    const data = await response.json();
    updateWeatherDetails(data);
  } catch (err) {
    console.error(err);
    displayError("An error occurred. Please try again.");
  }
}

function displayError(message) {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = message;
  errorElement.style.display = "block";
  document.querySelector('.weather-details').style.display = "none";
}

function updateWeatherDetails(data) {
  document.querySelector('.error').style.display = "none";
  document.querySelector('.weather-details').style.display = "flex";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = parseInt(data.main.temp).toString() + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".pressure").innerHTML = data.main.pressure + " Pa";
  document.querySelector(".wind-speed").innerHTML = data.wind.speed + " KM/H";
  document.querySelector(".weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

searchButton.addEventListener("click", () => {
  getWeatherDetails(searchField.value);
});