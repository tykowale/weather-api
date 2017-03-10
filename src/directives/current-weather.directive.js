import angular from 'angular';

export default angular
    .module('weather.current', [])
    .directive('currentWeather', currentWeather)
    .name;

function currentWeather() {
    return {
        restrict: 'E',
        scope: {
            weather: '=',
            windUnit: '='
        },
        template: require('./current-weather.html')
    };
}
