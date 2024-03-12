const pageTitle = "Blue-Lake Forest";

const sourceCode = (`<html>
<head>
    <style>
        body {
            background-image: url('https://w.forfun.com/fetch/fb/fb3f5e89e666993d478e7b7f2201a947.jpeg');
            background-size: cover;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-size: 100vw 100vh;
            box-sizing: border-box;
            overflow: hidden;
            color: #000000;
        }

        #title {
            width: 100%;
            text-align: center;
            font-size: 4vmin;
            padding: 2vmin 0;
            margin: 0;
        }

        #subtitle {
            width: 100%;
            text-align: center;
            font-size: 2vmin;
            padding: 2vmin 0;
            margin: 0;
            font-style: italic;
        }

        #about-us, #positives {
            background-color: #5e3218;
            border: 2vmin solid #000;
            border-radius: 1rem;
            padding: 2vmin;
            box-sizing: border-box;
            width: 46%;
            height: 55%;
            margin: 5% 2%;
        }

        #about-us {
            float: left;
        }

        #positives {
            float: right;
        }
        
        .section-title {
            text-decoration: underline;
            color: #d3d3d3;
        }
        
        #about-us p, #positives li {
            text-align: justify;
            font-size: 1.1rem;
            line-height: 1.5;
            margin: 0 0 1vmin 0;
            color: #d3d3d3;
        }

        #counter {
            width: 100%;
            text-align: center;
            position: fixed;
            bottom: 0;
            padding: 1vmin;
            font-weight: bold;
        }
    </style>
    <script>
        
    </script>
    <title>Camping</title>
</head>
<body>
    <h1 id="title">Camping at Blue-Lake Forest ⛺</h1>
    %0%
    %3%
        <h1 class="section-title">About the camping site:</h1>
        <p>Discover the charm of Blue-Lake Forest, your go-to camping spot for pure joy and untouched nature! Surrounded by tall trees and a crystal-clear lake, it's the ultimate escape. But here's the scoop: we take fun seriously, so no bear shenanigans here. Our local bears are on a vacation from scaring campers – they're probably practicing their fish-catching techniques. Rest assured, your camping experience is bear-free and full of laughter. Gather 'round the campfire, toast some marshmallows, and enjoy the simplicity of Blue-Lake Forest, where the only growls you'll hear are from your stomach after a hearty meal. Come for the tranquility, stay for the bear-free comedy – it's camping with a side of giggles!</p>
    </section>
    <section id="positives">
        <h2 class="section-title">Reasons to choose us:</h2>
        <ul>
            <li><strong>Bear-Free Bliss:</strong> No bear worries, just forest fashion shows and tranquility.</li>
            <li><strong>Nighttime Serenades:</strong> Owl lullabies and real-life bedtime tales under the stars.</li>
            %1%
            <li><strong>Quiet Hideaway:</strong> Escape the chaos, find peace in our secret forest clubhouse.</li>
            <li><strong>Kid-Friendly Fun:</strong> Nature walks, marshmallow hide-and-seek – even bears join games!</li>
            <li><strong>Wow-View Wakeups:</strong> Lake views, giant tree hugs – nature's morning perfection.</li>
            <li><strong>Snug Sleep:</strong> Cozy camping without the bear wrestling – for peaceful nights.</li>
            <li><strong>Fire Laughter:</strong> Surprise comedy nights, bear-approved jokes (think bear-y puns).</li>
            %4%
            <li><strong>Budget Adventures:</strong> Affordable fun – spend wisely, maybe on more marshmallows?</li>
        </ul>
    </section>
    %2%
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

function checkCorrectCode(input)
{
    const cleanInputCode = input.replace(/ /g,'');
    let cleanSourceCode = sourceCode;
    for (let i = 0; i < solutions.length; i++) {
        cleanSourceCode = cleanSourceCode.replace(`%${i}%`, solutions[i]);
        
    }
    cleanSourceCode = cleanSourceCode.replace(/ /g,'');
    console.log(cleanInputCode, cleanSourceCode);
    return (cleanSourceCode === cleanInputCode);
}

export default {pageTitle, getFaultyCode, checkCorrectCode, verboseTasks};

// %%FIX_SPOT%%

// <h2 id="subtitle">"Fun in Nature, Where Bears Take a Break!"</h2>