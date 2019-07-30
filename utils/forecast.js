const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/51c0681eb093157cd63fbf41e8c6fb9b/" +
    latitude +
    "," +
    longitude +
    "?units=si&lang=es";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log(body);
      callback(undefined, {
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability,
        summary: body.daily.data[0].summary
      });
    }
  });
};

module.exports = forecast