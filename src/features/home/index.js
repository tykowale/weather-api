import './home.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngBootstrap from 'angular-ui-bootstrap';

import routing from './home.routes';
import HomeController from './home.controller';
import fetchWeather from '../../services/fetchWeather.service';
import weatherPanel from '../../directives/weather-panel.directive';
import currentWeather from '../../directives/current-weather.directive';

export default angular
    .module('app.home', [
        uirouter,
        ngBootstrap,
        currentWeather,
        weatherPanel,
        fetchWeather
    ])
    .config(routing)
    .controller('HomeController', HomeController)
    .name;
