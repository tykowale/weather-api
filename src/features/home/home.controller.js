HomeController.$inject = ['$window', 'fetchWeatherService'];
export default function HomeController($window, fetchWeatherService) {
    var vm = this;

    vm.setUnits = setUnits;
    vm.searchZip = searchZip;
    vm.getWeather = getWeather;
    vm.success = success;
    vm.currentUnit = fetchWeatherService.getUnits();
    vm.isOpen = false;
    vm.error = false;

    vm.weatherList;
    vm.searchText;

    init();

    /**
    * Check to see if the user allows their geolocation to be used by the website,
    * if they do use it otherwise use the default
    */
    function init() {
        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(success, getWeather);
        } else {
            getWeather();
        }
    }

    function success(response) {
        let currentLocation = {
            lat: response.coords.latitude,
            lon: response.coords.longitude
        };

        fetchWeatherService.updateUserLocation(currentLocation);
        getWeather();
    }

    /**
    * Fetch the weather for either the desired zipcode or defaults
    * @param zipCode: String - zicode to see weather for
    */
    function getWeather(zipCode) {
        return fetchWeatherService.get5Day(zipCode)
            .then((response) => {
                vm.weatherList = response.list;
                vm.city = response.city;
                vm.currentWeather = response.list[0];
            })
            .catch(() => {
                vm.error = true;
            });
    }

    /**
    * Update the users desire unit, then update frontend display
    * @param unit: String - Imperial or Metric, decided by dropdown on frontend
    */
    function setUnits(unit) {
        fetchWeatherService.updateUserUnits(unit);
        vm.currentUnit = unit;

        getWeather();
    }

    function searchZip() {
        if (validZipCode(vm.searchText)) {
            getWeather(vm.searchText);
            vm.error = false;
            vm.searchText = '';
        } else {
            vm.error = true;
        }
    }

    /**
    * Ensure that the users input is a valid zipcode, if it is
    * return true, otherwise false. Nonnumbers put through Number()
    * result in NaN and isNaN is a default JS function
    * @param zipCode: String|Number - zip code to validate
    */
    function validZipCode(zipCode) {
        const zip = Number(zipCode);

        if (isNaN(zip)) {
            return false;
        }

        if (zip > 99999 || zip < 1001) {
            return false;
        }

        return true;
    }
}
