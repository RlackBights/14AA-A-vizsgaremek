const pageTitle = "Cam's Coffee";

const sourceCode = (`<html>
<head>
    <style>
        :root{
            scroll-behavior: smooth;
        }
        body {
            background-color: #412e20;
            box-sizing: border-box;
            margin: 0;
        }
        #navbar {
            box-sizing: border-box;
            width: 100%;
            height: 7vh;
            background-color: rgb(159, 124, 86);
            display: flex;
            justify-content: space-between;
            padding: 0.5vmin;
            position: sticky;
            top: 0;
        }
        #navbar ul {
            display: flex;
            width: 25vw;
            justify-content: space-evenly;
            list-style-type: none;
            align-items: center;
        }
        #navbar ul li a {
            color: #3c2a1d;
            text-decoration: none;
            font-weight: bold;
            font-size: 2.5vmin;
        }
        #navbar ul li a:hover {
            color: #c7a68f;
        }
        #about-us, #our-work {
            box-sizing: border-box;
            height: 100vh;
            color: #c7a68f;
        }
        #banner {
            height: 50vh;
            width: 100%;
        }
        #about-us h1, #our-work h1 {
            box-sizing: border-box;
            font-size: 5vmin;
            margin: auto;
            width: 12%;
            padding-top: 7vh;
            padding-bottom: 3vh;
            font-style: italic;
        }
        #about-us p {
            width: 80%;
            margin: auto;
            font-size: 2vmin;
            text-align: justify;
            margin-bottom: 1vh;
        }
        #about-us div {
            width: 80%;
            display: flex;
            margin: auto;
            padding-top: 7vh;
            justify-content: space-evenly;
        }
        #about-us div img {
            border: 0.25rem solid rgb(159, 124, 86);
            border-radius: 1rem;
        }
        #our-work {
            background-image: url(https://img.freepik.com/free-photo/coffee-beans-dark-background-top-view-coffee-concept_1220-6299.jpg?w=1380&t=st=1711368879~exp=1711369479~hmac=2a667d4573a85e6a58f6ff13bf5b2a5e9b42a7dc16123400abb0973f1231b2d5);
            background-position: center;
            background-size: cover;
        }
        #products {
            width: 85%;
            margin: auto;
            text-align: justify;
        }
        #products h2 {
            margin-top: 3vh;
            margin-bottom: 0.5vh;
            color: #5e422d;
        }
        #products p {
            font-size: 2vmin;
            margin: 0;
            padding-left: 1.5vw;
        }
        #products ul {
            margin: 0;
        }
        #contact-us {
            height: 20vh;
            width: 100%;
            padding-top: 3vh;
            box-sizing: border-box;
        }
        #contact-us ul {
            box-sizing: border-box;
            display: flex;
            margin: auto;
            width: 50%;
            height: 80%;
            background-color: rgba(0, 0, 0, 0.2);
            justify-content: space-evenly;
            list-style-type: none;
            border-radius: 1rem;
            color: rgb(159, 124, 86);
        }
        #contact-us ul li {
            text-align: center;
        }
        #contact-us ul li p {
            text-align: justify;
        }
    </style>
    <script>
        
    </script>
    <title>Cam's Coffee</title>
</head>
<body>
    <section id="navbar">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/023/628/609/small/coffee-shop-logo-design-png.png" alt="logo">
        <ul>
            <li><a href="#about-us">About us</a></li>
            <li><a href="#our-work">Our Work</a></li>
            <li><a href="#contact-us">Contact us</a></li>
        </ul>
    </section>
    <img id="banner" src="https://thumbs.dreamstime.com/b/coffee-banner-ads-d-illustratin-latte-woodcut-style-decorations-kraft-paper-background-141918114.jpg" alt="">
    <section id="about-us">
        <h1>About Us</h1>
        <p>Welcome to Cam's Coffee, where our passion for coffee transcends borders, connecting people through the shared experience of exceptional brews.
            At Cam's, we don't just sell coffee; we curate moments of warmth, inspiration, and joy.
        </p>
        <p>
            From the verdant slopes of Colombia to the sun-drenched plantations of Ethiopia, we source only the finest coffee beans, meticulously selecting each one for its unique flavor profile and ethical sourcing practices.
            With a commitment to sustainability and fair trade, we ensure that every sip of Cam's Coffee is not only delicious but also supports the livelihoods of farmers and preserves the environment.
            Once the beans reach our roastery, our skilled artisans work their magic, carefully roasting them to unlock their full potential.
            The result is a symphony of flavors that dance on your palate, from the bold richness of dark roast to the delicate nuances of a light roast.
            But Cam's Coffee is more than just a beverage; it's a catalyst for connection.
            Whether you're starting your day with a quiet cup of joe or gathering with friends for a lively chat, our coffee sets the stage for memorable moments.
            We believe in the power of community, and we're proud to be a part of your daily rituals and special occasions alike.
            Beyond our passion for coffee, Cam's Coffee is committed to making a positive impact on the world.
            From our eco-friendly packaging to our support for social initiatives, we strive to create a brighter future for coffee-growing communities and the planet.
            Join us in celebrating the artistry of coffee and the joy of shared moments.
            From our family to yours, we invite you to experience the magic of Cam's Coffee—one sip at a time.
        </p>
        <div>
            <img src="https://media.istockphoto.com/id/1349239413/photo/shot-of-coffee-beans-and-a-cup-of-black-coffee-on-a-wooden-table.webp?b=1&s=612x612&w=0&k=20&c=YaXq8wWShhtiRnEVJvPTd_0h4eeZ1CFEYi0BszPg74A=" alt="">
            <img src="https://img.freepik.com/premium-photo/cup-coffee-with-latte-art-rim_865967-7816.jpg" alt="">
        </div>
    </section>
    <section id="our-work">
        <h1>Our Work</h1>
        <div id="products">
            <h2>Signature Blends:</h2>
            <p>
            <ul>
                <li><strong>Cam's Classic Blend:</strong> A balanced blend of medium-roasted beans, perfect for everyday
                    enjoyment.</li>
                <li><strong>Sunrise Blend:</strong> A bright and lively blend to kickstart your mornings with a burst of
                    flavor.</li>
                <li><strong>Sunset Blend:</strong> A smooth and mellow blend, ideal for winding down after a long day.
                </li>
            </ul>
            </p>
            <h2>Single-Origin Coffees:</h2>
            <p>
            <ul>
                <li><strong>Colombian Supremo:</strong> Rich and full-bodied with notes of chocolate and caramel.</li>
                <li><strong>Ethiopian Yirgacheffe:</strong> Bright and floral with hints of citrus and jasmine.</li>
                <li><strong>Brazilian Santos:</strong> Nutty and sweet with a smooth finish.</li>
            </ul>
            </p>
            <h2>Specialty Roasts:</h2>
            <p>
            <ul>
                <li><strong>French Roast:</strong> Bold and intense with a smoky aroma and dark chocolate undertones.
                </li>
                <li><strong>Espresso Blend:</strong> A complex and robust blend designed for the perfect shot of
                    espresso.</li>
                <li><strong>Decaf Blend:</strong> All the flavor without the caffeine, perfect for late-night
                    indulgence.</li>
            </ul>
            </p>
            <h2>Flavored Coffees:</h2>
            <p>
            <ul>
                <li><strong>Vanilla Nut:</strong> A creamy blend of vanilla and roasted nuts for a sweet treat.</li>
                <li><strong>Caramel Macchiato:</strong> Indulge in the rich flavors of caramel and creamy milk.</li>
                <li><strong>Hazelnut Delight:</strong> A nutty and aromatic blend that's both comforting and delicious.
                </li>
            </ul>
            </p>
            <h2>Cold Brew Concentrate:</h2>
            <p>
            <ul>
                <li><strong>Cold Brew Concentrate:</strong> A concentrated brew perfect for creating your own refreshing
                    cold brew at home. Just add water or milk and enjoy!</li>
            </ul>
            </p>
            <h2>Accessories:</h2>
            <p>
            <ul>
                <li><strong>Cam's Coffee Mug:</strong> Start your day right with our stylish and durable ceramic mug,
                    perfect for enjoying your favorite brew.</li>
                <li><strong>Coffee Grinder:</strong> Take control of your coffee experience with our premium grinder,
                    ensuring a fresh grind every time.</li>
                <li><strong>Pour Over Set:</strong> Elevate your brewing method with our pour-over set, designed for a
                    smooth and flavorful cup of coffee.</li>
            </ul>
            </p>

        </div>
    </section>
    <section id="contact-us">
        <ul>
            <li>
                <h3>Address</h3>
                <p>Cam's Coffee Shop <br>
                    123 Main Street <br>
                    Anytown, USA 12345
                </p>
            </li>
            <li>
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
            </li>
            <li>
                <h3>Email</h3>
                <p>info@camcoffee.com</p>
            </li>
        </ul>
    </section>
</body>
</html>`)

const solutions = [
    `<h2 id="subtitle">"Fun in Nature, Where Bears Take a Break!"</h2>`,
    `<li><strong>S'more Joy:</strong> Starry skies, marshmallow delights, and growls of happy tummies.</li>`,
    `<p id="counter"><i>Number of bear attacks (since the big bang): 126378</i></p>`,
    `<section id="about-us">`,
    `<li><strong>Nature's Pals:</strong> Keep it green, no litterbugs – happy campers unite!</li>`
];

const tasks = [
    `<h3 id="subtitle">"Fun in Nature, Where Bears Take a Break!"</h3>`,
    `<item><strong>S'more Joy:</strong> Starry skies, marshmallow delights, and growls of happy tummies.</item>`,
    `<p id="counter">Number of bear attacks (since the big bang): 126378</p>`,
    `<section id="">`,
    `<li>Nature's Pals: Keep it green, no litterbugs – happy campers unite!</li>`
];

const verboseTasks = [
    `Change the subtitle's element to make it one size bigger`,
    `Fix the mistyped list item's HTML tag`,
    `Make the bottom text italic, using an HTML tag`,
    `The about-us section is missing the "about-us" style tag`,
    `The seconds to last list item's "Nature's Pals" text should be bold using an HTML tag`
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
    const cleanInputCode = input.replace(/ /g,'');
    let output = [];

    for (let i = 0; i < faultyList.length; i++) {
        output.push(cleanInputCode.includes(solutions[faultyList[i]].replace(/ /g,'')));
    }

    return output;
}

// eslint-disable-next-line
export default {pageTitle, getFaultyCode, checkCorrectCode, verboseTasks};