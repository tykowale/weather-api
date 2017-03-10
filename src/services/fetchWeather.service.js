import angular from 'angular';
const API_KEY = require('../../secrets.json').API_KEY;

export default angular
    .module('weather', [])
    .service('fetchWeatherService', fetchWeatherService)
    .name;

fetchWeatherService.$inject = ['$http'];

function fetchWeatherService($http) {
    const self = this;
    let defaultParams = {
        units: 'Imperial',
        cnt: '6',
        zip: '60661',
        appid: API_KEY
    };

    self.get5Day = get5Day;
    self.updateUserLocation = updateUserLocation;
    self.updateUserUnits = updateUserUnits;
    self.getUnits = getUnits;
    self.setApiKey = setApiKey;

    // for testing purposes
    function setApiKey(apiKey) {
        defaultParams.appid = apiKey;
    }

    /**
     * takes in an optional zipcode and queries for the proper forecast
     * based off input and default paramters
     * @param zipCode: Optional{String|Number} - zipcode to view weather for
     */
    function get5Day(zipCode) {
        const params = zipCode ?
            Object.assign(defaultParams, {
                zip: zipCode,
                lat: undefined,
                lon: undefined
            }) :
            defaultParams;

        return $http
            .get('http://api.openweathermap.org/data/2.5/forecast/daily', {
                params: params
            })
            .then(reponse => {
                return reponse.data;
            });
    }

    /**
     * Used for testing purposes, comment out the real get5Day and add in
     * $q as an injection
     */
    // function get5Day() {
    //     return $q.resolve(require('./sample-response.json'));
    // }

    /**
     * ensure object has needed information, then update the default
     * params, this function has side effects
     * @param geoLocationObj: Object - object with lat and lon data
     */
    function updateUserLocation(geoLocationObj) {
        if (!geoLocationObj.lat || !geoLocationObj.lon) {
            return;
        }

        defaultParams.lat = geoLocationObj.lat;
        defaultParams.lon = geoLocationObj.lon;
        delete defaultParams.zip;
    }

    /**
     * ensure units is not undeinfed, then update the default
     * params, this function has side effects
     * @param unit: String - string set by toolbar dropdown
     */
    function updateUserUnits(units) {
        if (!units) {
            return;
        }

        defaultParams.units = units;
    }

    /**
     * Used on the frontend to know what the user prefers
     */
    function getUnits() {
        return defaultParams.units;
    }
}
