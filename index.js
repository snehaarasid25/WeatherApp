const tempArea = document.querySelector(".weather1");
const cityArea = document.querySelector(".weather2 p");
const dateArea = document.querySelector(".weather2 span");
const imgArea = document.querySelector(".weather3 img");
const weatherArea = document.querySelector(".weather3 span");
const searchArea = document.querySelector(".searcharea");
const form = document.querySelector("form");
form.addEventListener("submit", search);

let target = "solapur";
const fetchData = async (target) => {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=c7d789d7a8c74ed39e655856232203&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};
function updateDom(temperature, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  

  tempArea.innerText = temperature;
  cityArea.innerText = city;
  dateArea.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
  imgArea.src = emoji;
  weatherArea.innerText = text;
}
fetchData(target);

function search(e) {
  e.preventDefault();
  target = searchArea.value;
  fetchData(target);
}

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturdat";

    default:
      return "Sorry!";
  }
}
