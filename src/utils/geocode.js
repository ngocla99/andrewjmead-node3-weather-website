const request = require("postman-request");

const geocode = (address, callback) => {
  const URL_MAP = "http://api.positionstack.com/v1/forward?access_key=de9e8d7a210e7f1ebc45f3eab35c62ad";

  request({ url: `${URL_MAP}&query=${encodeURIComponent(address)}`, json: true }, function (error, response, body) {
    if (error) {
      callback("Unable connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      const latitude = body.data[0].latitude;
      const longitude = body.data[0].longitude;
      const location = body.data[0].label;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
