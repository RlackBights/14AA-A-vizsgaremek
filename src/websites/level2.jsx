const pageTitle = "Sunny Side Down";

const sourceCode = (`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background-color: #333;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            scroll-behavior: smooth;
        }

        #navbar {
            background-color: #4d97af;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            position: %7%;
            top: 0;
            z-index: 999;
        }

        #navbar img {
            height: 50px;
        }

        #navbar ul {
            display: flex;
            list-style-type: none;
        }

        #navbar ul li {
            margin-right: 20px;
        }

        #navbar ul li a {
            text-decoration: none;
            color: #fff;
            font-weight: bold;
            font-size: 18px;
        }

        #navbar ul li a:hover {
            color: #da9c70;
        }

        #about-us, #our-work, #contact-us {
            padding: 50px 20px;
            color: #fff;
        }

        #about-us {
            padding-top: 0;
        }

        #weather-england {
            %5%
        }

        #banner {
            width: 100%;
            height: 50vh;
            object-fit: cover;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 20px;
            color: #fff;
        }

        p {
            font-size: %6%px;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        section {
            padding: 50px 0;
        }

        #about-us div {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
        }

        #about-us div img {
            width: 45%;
            border-radius: 10px;
        }
    
        .weather-data {
            background-color: rgba(255, %9%, 255, 0.3);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .weather-data h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #fff;
        }
    
        .weather-data p {
            font-size: 16px;
            margin-bottom: 5px;
            color: #fff;
        }
    
        .weather-data .temperature {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }

        #our-work {
            background-image: url("https://media.gettyimages.com/id/454413422/video/storm-clouds.jpg?s=640x640&k=20&c=46ojMFje7xE1Xn014zMpP-sHAMsekT6dRoDulLd397Y=");
            %8%
        }

        #services {
            margin-top: 30px;
        }

        #services h2 {
            margin-bottom: 15px;
            color: #fff;
        }

        #services ul {
            list-style-type: none;
            padding-left: 20px;
        }

        #services ul li {
            margin-bottom: 10px;
        }

        #contact-us ul {
            display: flex;
            justify-content: space-around;
            list-style-type: none;
            padding: 0;
        }

        #contact-us ul li {
            text-align: center;
            margin-right: 30px;
        }

        #contact-us ul li:last-child {
            margin-right: 0;
        }

        #contact-us h3 {
            margin-bottom: 10px;
            color: #fff;
        }

        #contact-us p {
            margin: 0;
        }
    </style>
    <title>Sunny Side Down</title>
</head>
<body>
    <section id="navbar">
        %2%
        <ul>
            <li><a>About us</a></li>
            <li><a>Our Work</a></li>
            <li><a>Contact us</a></li>
        </ul>
    </section>
    <section id="about-us">
        <h1>Sunny Side Down!</h1>
        <h3>Welcome to our weather forecast service, where you can get accurate weather updates for your location. We provide comprehensive weather information to help you plan your day effectively.</h3>
    </section>
    %1%
            <h2>Current Weather in England</h2>
            <p><strong>Location:</strong> London, England</p>
            <p><strong>Temperature:</strong> 15°C</p>
            <p><strong>Weather:</strong> Mostly Cloudy</p>
            <p><strong>Wind:</strong> 10 km/h</p>
            <p><strong>Humidity:</strong> 75%</p>
        </div>
    </section>
    <section id="our-work">
        <h1>Our Weather Services</h1>
        <div id="services">
            <h2>Forecast:</h2>
            <p>Get accurate weather forecasts for today and the upcoming days, including temperature, humidity, wind speed, and more.</p>
            <h2>Current Conditions:</h2>
            <p>Check the current weather conditions in your area, including temperature, humidity, and wind speed.</p>
            %0%
        </div>
    %4%
    <section id="contact-us">
        <h1>Contact Us</h1>
        <ul>
            <li>
                <h3>Address</h3>
                <p>Sunny Side Down<br>
                    123 Weather Street <br>
                    Anytown, USA 12345
                </p>
            </li>
            <li>
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
            </li>
            <li>
                <h3>Email</h3>
                %3%
            </li>
        </ul>
    </section>
</body>
</html>`)

const solutions = [
    `<h2>Radar:</h2>\n<p>View live radar images to track precipitation, storms, and other weather patterns in real-time.</p>\n<h2>Alerts:</h2>\n<p>Receive weather alerts and notifications for severe weather conditions, such as storms, hurricanes, and tornadoes.</p>`,
    `<section id="weather-england">\n\t<div class="weather-data">`,
    `<img src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png" alt="logo">`,
    `<p>info@sunnysidedown.com</p>`,
    `</section>`,
    `padding: 0 20px 50px 20px;`,
    `18`,
    `sticky`,
    `background-repeat: no-repeat;\nbackground-size: cover;`,
    `255`
];

const tasks = [
    `<h2>Radar:</h2>\n<p>Receive weather alerts and notifications for severe weather conditions, such as storms, hurricanes, and tornadoes.</p>\n<h2>Alerts:</h2>\n<p>View live radar images to track precipitation, storms, and other weather patterns in real-time.</p>`,
    `<section id="weather-data">\n\t<div class="weather-england">`,
    `<img url="https://cdn-icons-png.flaticon.com/512/4052/4052984.png" alt="logo">`,
    `<a>info@sunnysidedown.com</a>`,
    ``,
    `padding: 0`,
    `1.8`,
    `fixed`,
    `background-repeat: inherit;\nbackground-size: auto;`,
    `0`
];

const verboseTasks = [
    `[HTML] The description of "Radar" and "Alerts" have been swapped on accident`,
    `[HTML] The section containing the England weather data and the div under it have their style tags swapped`,
    `[HTML] The logo in the navbar isn't showing up, make sure it's linked correctly`,
    `[HTML] The email address in the contact us section seems to be miscolored, even though it should be a paragraph element`,
    `[HTML] The "Our Work" section isn't closed off, which it should be right before the "Contact Us" section`,
    `[CSS] Add a bottom padding of 50px and a side padding of 20px to the section containing the England weather data, using one 'padding' tag. Leave the top padding at 0`,
    `[CSS] The font size of the paragraph elements in the CSS was mistyped to be 10x smaller than it should be, please scale it back up to 18 pixels`,
    `[CSS] Make the navbar sticky, so that it stays at the top of the page when you scroll down`,
    `[CSS] Make the background image of the services not repeat itself, and make it cover the entire element`,
    `[CSS] The background color of the england weather section should be white with the current transparency, but it's miscolored`
]

function getFaultyCode(faultyList)
{
    let tempCode = sourceCode;
    for (let i = 0; i < solutions.length; i++) {
        if (faultyList.includes(i)) {
            tempCode = tempCode.replace(`%${i}%`, tasks[i]);
        } else {
            tempCode = tempCode.replace(`%${i}%`, solutions[i]);
        }
        
    }
    
    return tempCode;
}

function checkCorrectCode(input, faultyList)
{
    const cleanInputCode = input.replace(/ /g,'').replace(/[\r\n]+/g, '').replace(/[\t]+/g, '');
    let output = [];

    for (let i = 0; i < faultyList.length; i++) {
        try {
            output.push(cleanInputCode.includes(solutions[faultyList[i]].replace(/ /g,'').replace(/[\r\n]+/g, '').replace(/[\t]+/g, '')));
        } catch {
            output.push(false);
        }
    }

    return output;
}

// eslint-disable-next-line
export default {pageTitle, getFaultyCode, checkCorrectCode, verboseTasks};