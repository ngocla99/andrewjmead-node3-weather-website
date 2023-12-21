console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetchWeather(location);
});

const fetchWeather = async (address) => {
  try {
    const response = await fetch(`http://localhost:3005/weather?address=${address}`);
    const data = await response.json();

    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
    }
  } catch (err) {
    console.log(err);
  }
};
