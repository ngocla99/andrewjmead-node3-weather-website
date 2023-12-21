const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const URL_WEATHER = "http://api.weatherstack.com/current?access_key=031d84f3bbb108b38879e2f071c03045";

  request(
    { url: `${URL_WEATHER}&query=${latitude},${longitude}&units=f`, json: true },
    function (error, response, body) {
      if (error) {
        callback("Unable connect to weather services!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        const statement = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out`;

        callback(undefined, statement);
      }
    }
  );
};

module.exports = forecast;
