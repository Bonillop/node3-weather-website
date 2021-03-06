const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  
  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //Saco el valor del input de la ubicacion
  const location = searchElement.value;

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const informacion = "La temperatura es de " + data.forecast.temperature + " °C, con una máxima de " +
        data.forecast.temperatureHigh + " °C, y una mínima de " + data.forecast.temperatureLow + " °C. " +
        "La probabilidad de lluvias es de " +
        data.forecast.precipProbability + "%. " + data.forecast.summary;
        messageOne.textContent = data.location;
        messageTwo.textContent = informacion;
      }
    });
  });

  console.log("Submitted");
});
