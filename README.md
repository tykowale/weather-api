# Ty's Awesome Weather App
Technologies Used:
* Angular 1.5.x
* ES6
* Webpack
* Karma/Jasmine/eslint
* Bootstrap

This was my attempt at building a basic weather app using the http://openweathermap.org/ api and
Angular 1.5. The front end by default will use your current location if allowed, if
not it defaults to the zip code 60661 (Chicago). You can switch between Metric and Imperial units
with the app defaulting to Imperial. You can search for new different zip codes, and if the zip
code is valid it will display weather for that location. Prior to making the call it will validate
the zip code is at least 6 digits from 01001 through 99999. It currently does not support the
additional 4 digits sometimes used by the post office.

I do not claim to be a designer as is very evident by looking at the web application. When given
a design I can usually implement it but I have no artist bone in my body.

Email me (tykowale@gmail.com) with any questions!

## Running
Before running this make sure to have Node > 6.x installed.

To run locally first clone the repository then change into the directory.
Go to http://openweathermap.org/ and sign up for a api. Once you have that put it in the
`secrets.json` file where it says "PUT_API_KEY_HERE". After that run the following commands.
```
npm install
npm run dev
```

Open your favorite browser(Chrome) and navigate to `localhost:8080`

Enjoy :)

## Testing
If you have already followed the above steps run `npm run test`

## Linting
If you have already followed the above steps run `npm run lint`
