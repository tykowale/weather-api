import angular from 'angular';

export default angular
    .module('weather.panel', [])
    .directive('weatherPanel', weatherPanel)
    .name;

function weatherPanel() {
    return {
        restrict: 'E',
        scope: {
            weather: '='
        },
        template: require('./weather-panel.html'),
        link: link
    };

    function link(scope) {
        scope.date = scope.weather.dt * 1000;
    }
}
