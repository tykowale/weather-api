import currentWeather from './current-weather.directive';
import angular from 'angular';

describe('currentWeatherDirective', () => {
    let directive;

    beforeEach(angular.mock.module(currentWeather));
    beforeEach(angular.mock.inject((currentWeatherDirective) => {
        directive = currentWeatherDirective[0];
    }));

    it('is handled as an element', () => {
        expect(directive.restrict).toBe('E');
    });

    it('loads the required template', () => {
        expect(directive.template).toBeDefined();
    });
});
