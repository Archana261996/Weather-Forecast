// Not including the API key with the code here for privacy concerns
const apiKey = "";
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=chicago`;

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const labels = [];
    const temperatures = [];
    let html = `<div class = "Weather-summary">Weather Forecast</div><br><br>`;
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      labels.push(date);
      temperatures.push(forecast.main.temp - 273.15);

      html += `
      <div class="daily-card">
       <b> <div class="date">${date}</div></b>
        <div class="icon"><img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }.png"/></div>
        <div class="description">${forecast.weather[0].description}</div>
        <div class="temp">Min: ${Math.round(
          forecast.main.temp_min - 273.15
        )} °C</div>
        <div class="temp">Max: ${Math.round(
          forecast.main.temp_max - 273.15
        )} °C</div>
      </div>
    `;
    }

    document.getElementById("forecast").innerHTML = html;

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });
