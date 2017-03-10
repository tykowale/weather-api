import weatherPanel from './weather-panel.directive';
import angular from 'angular';

describe('WeatherPanelDirective', () => {
    let directive;

    beforeEach(angular.mock.module(weatherPanel));
    beforeEach(angular.mock.inject((weatherPanelDirective) => {
        directive = weatherPanelDirective[0];
    }));

    it('is handled as an element', () => {
        expect(directive.restrict).toBe('E');
    });

    it('loads the required template', () => {
        expect(directive.template).toBeDefined();
    });

    it('accounts for the difference between the api date and js date', () => {
        const link = directive.link;
        let scope = {
            weather: {
                dt: 1
            }
        };
        link(scope);

        expect(scope.date).toBe(1000);
    });
});
