import home from './index';
import angular from 'angular';

describe('HomeController', function() {
    let $controller;
    let $q;
    let $scope;
    let $window;
    let fetchWeatherService;
    let ctrl;

    beforeEach(angular.mock.module(home));

    beforeEach(angular.mock.inject(function(_$controller_, _$q_, $rootScope) {
        $controller = _$controller_;
        $q = _$q_;
        $scope = $rootScope.$new();
        $window = {
            navigator: {
                geolocation: {
                    getCurrentPosition: () => {}
                }
            }
        };

        fetchWeatherService = {
            get5Day: () => {},
            updateUserUnits: () => {},
            updateUserLocation: () => {},
            getUnits: () => {}
        };
        ctrl = $controller('HomeController', {
            $window: $window,
            fetchWeatherService: fetchWeatherService
        });
    }));

    it('isOpen is initialized to false and no errors', function() {
        expect(ctrl.isOpen).toBe(false);
        expect(ctrl.error).toBe(false);
    });

    describe('#success()', () => {
        it('sets the users latitude and longitude', () => {
            spyOn(fetchWeatherService, 'updateUserLocation');
            spyOn(fetchWeatherService, 'get5Day').and.returnValue($q.resolve());
            const response = {
                coords: {
                    latitude: 1,
                    longitude: 2
                }
            };
            ctrl.success(response);

            expect(fetchWeatherService.updateUserLocation).toHaveBeenCalledWith({
                lat: 1,
                lon: 2
            });
        });
    });

    describe('#searchZip()', () => {
        it('rejects non-number searchs', () => {
            ctrl.searchText = 'abc';
            ctrl.searchZip();
            expect(ctrl.error).toBe(true);
        });

        it('rejects zip codes above 99999', () => {
            ctrl.searchText = '100000';
            ctrl.searchZip();
            expect(ctrl.error).toBe(true);
        });

        it('rejects zip codes below 01001', () => {
            ctrl.searchText = '01000';
            ctrl.searchZip();
            expect(ctrl.error).toBe(true);
        });

        it('allows valid zip codes', () => {
            spyOn(fetchWeatherService, 'get5Day').and.returnValue($q.resolve());
            ctrl.searchText = '60657';
            ctrl.searchZip();

            expect(fetchWeatherService.get5Day).toHaveBeenCalled();
            expect(ctrl.error).toBe(false);
        });
    });

    describe('#getWeather()', () => {
        it('sets weatherList, city and current weather on successful call', (done) => {
            spyOn(fetchWeatherService, 'get5Day').and.returnValue($q.resolve({
                list: ['foo', 'bar'],
                city: 'Chicago'
            }));

            ctrl.getWeather()
                .then(() => {
                    expect(ctrl.weatherList).toEqual(['foo', 'bar']);
                    expect(ctrl.city).toBe('Chicago');
                    expect(ctrl.currentWeather).toBe('foo');
                    done();
                });

            $scope.$apply();
        });

        it('puts up an error on invalid call', (done) => {
            spyOn(fetchWeatherService, 'get5Day').and.returnValue($q.reject());

            ctrl.getWeather()
                .then(() => {
                    expect(ctrl.error).toBe(true);
                    done();
                });

            $scope.$apply();
        });
    });

    describe('#setUnits()', () => {
        it('updates the users preferred units', () => {
            spyOn(fetchWeatherService, 'updateUserUnits');
            spyOn(fetchWeatherService, 'get5Day').and.returnValue($q.resolve());
            ctrl.setUnits('foo');

            expect(ctrl.currentUnit).toBe('foo');
            expect(fetchWeatherService.get5Day).toHaveBeenCalled();
        });
    });
});
