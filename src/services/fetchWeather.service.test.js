import weather from './fetchWeather.service';
import angular from 'angular';

describe('fetchWeatherService', () => {
    let $httpBackend;
    let $q;
    let fetchWeatherService;
    beforeEach(angular.mock.module(weather));

    beforeEach(angular.mock.inject((_$q_, _$httpBackend_, _fetchWeatherService_) => {
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        fetchWeatherService = _fetchWeatherService_;
        fetchWeatherService.setApiKey('1');
    }));

    it('uses defaults in http request', done => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&zip=60661')
            .respond($q.resolve('foo'));

        fetchWeatherService.get5Day()
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('properly passes the desired zip code', done => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&zip=11111')
            .respond($q.resolve('foo'));

        fetchWeatherService.get5Day('11111')
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('does not update the defaultParams when passed bad data', (done) => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&zip=11111')
            .respond($q.resolve('foo'));

        fetchWeatherService.updateUserLocation({});
        fetchWeatherService.get5Day('11111')
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('uses correct info after updating user location', (done) => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&lat=1&lon=2')
            .respond($q.resolve('foo'));

        fetchWeatherService.updateUserLocation({
            lat: '1',
            lon: '2'
        });

        fetchWeatherService.get5Day()
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('uses desired zip after updating user location', (done) => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&zip=11111')
            .respond($q.resolve('foo'));

        fetchWeatherService.updateUserLocation({
            lat: '1',
            lon: '2'
        });
        fetchWeatherService.get5Day('11111')
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('uses desired units after updating user preferences', (done) => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Metric&zip=60661')
            .respond($q.resolve('foo'));

        fetchWeatherService.updateUserUnits('Metric');
        fetchWeatherService.get5Day()
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('does not update when passing undefined values', (done) => {
        $httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?appid=1&cnt=6&units=Imperial&zip=60661')
            .respond($q.resolve('foo'));

        fetchWeatherService.updateUserUnits();
        fetchWeatherService.get5Day()
            .then(response => {
                expect(response).toBe('foo');
                done();
            });

        $httpBackend.flush();
    });

    it('returns the users preferred units', () => {
        expect(fetchWeatherService.getUnits()).toBe('Imperial');

        fetchWeatherService.updateUserUnits('Metric');

        expect(fetchWeatherService.getUnits()).toBe('Metric');
    });
});
