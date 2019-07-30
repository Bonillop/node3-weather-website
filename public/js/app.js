console.log("Pepe is working!");

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
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.summary;
      }
    });
  });

  console.log("Submitted");
});
