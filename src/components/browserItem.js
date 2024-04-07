export class BrowserItem {
    constructor(title, short, example, detailed) {
        this.title = title;
        this.short = short;
        this.example = example;
        this.detailed = detailed;
    }
}

export const HTMLDocs = [
    new BrowserItem("<html>", "The <html> element is the main container for web content.",
    `<html lang="en">
    <head>
        <!-- Metadata goes here -->
    </head>
    <body>
        <!-- Content goes here -->
    </body>
</html>`,
    `The <html> element is like the main container for your web page. It's where you put all your content, like text, images, and links. It's kind of like the frame of a house that holds everything together.

Inside the <html> element, you have other important sections. The <head> section is where you put important information about your webpage, and the <body> section is where you put all the stuff that people actually see when they visit your site.

So, think of <html> as the big box that holds your entire webpage, and inside that box, you have smaller sections where you put specific types of information.`),

    new BrowserItem("<head>", "Main container for the metadata of your page.",
    `<head>
    <title>My Website</title>
    <meta charset="UTF-8">
    <meta name="description" content="Welcome to my website!">
    <link rel="stylesheet" href="styles.css">
</head>`,
    `The <head> element in HTML is where you stash important details about your webpage, but they're not directly visible.
    
It contains information like the title, the character encoding for your text, and it could even include the style that shapes your site (more about styles in the <style> element and the CSS section).

It's one of the 2 most common "top-level" elements, meaning placed directly in the <html> itself, the other being <body>.`),

    new BrowserItem("<body>", "Main container for the content of your page.",
    `<body>
    <h1>Welcome to my website!</h1>
    <p>I like to do the following things:</p>
    <ul>
        <li>Sleep</li>
        <li>Eat</li>
        <li>Drink</li>
        <li>Code</li>
        <li>Play</li>
    </ul>
</body>`,
    `The <body> element in HTML is where you put everything you want the people to see.
    
It contains every element that you want to show on your webpage, like text, images, videos, and much more!.

It's one of the 2 most common "top-level" elements, meaning placed directly in the <html> itself, the other being <head>.`),

    new BrowserItem("<style>", "Controls webpage styles.",
    `<style>
    section { /* Changes the look of every <section> element */
        background-color: lightblue;
        font-family: Arial, sans-serif;
    }
    #content { /* Changes the look of every element with the 'id' attribute of "content" */
        color: navy;
    }
    .headers { /* Changes the look of every element with the 'class' attribute of "headers" */
        color: darkblue;
    }
</style>`,
    `<style> is like a wardrobe for your webpage, it defines the colors, fonts, and layouts of your elements to make your page look good using CSS.
    
As you can see in the example, the 3 most common ways to select elements to change their looks are:
    ▫ Element selectors, using the name of the element,
    ▫ ID selectors, using the 'id' with a hash before it,
    ▫ Class selectors, using the 'class' with a period before it

It can be found inside the <head> element of your site.`),

    new BrowserItem("<title>", "Defines webpage title.",
    `<head>
    <title>Welcome to My Website</title>
</head>`,
    `<title> sets the name of your webpage. It's like the title of a book, helping people understand what your webpage is about when they see it in their browser tab. It can be found inside the <head> element of your site.`),

    new BrowserItem("<h1>-<h6> headers", "Defines heading levels.",
    `<body>
    <h1>Main Heading</h1>
    <h2>Subheading 1</h2>
    <h3>Subheading 2</h3>
    <h4>Subheading 3</h4>
    <h5>Subheading 4</h5>
    <h6>Subheading 5</h6>
</body>`,
    `<h1> to <h6> are different sizes of titles for your webpage content. <h1> is the biggest and most important, and <h6> is the smallest, like a subsection title. They help organize your content and make it easier for readers to understand the structure of your webpage.`),

    new BrowserItem("<section>", "Groups related content.",
    `<body>
    <section>
        <h1>About Us</h1>
        <p>Welcome to our website! We are dedicated to providing quality products.</p>
    </section>
    <section>
        <h2>Our Products</h2>
        <p>Explore our wide range of products designed to meet your needs.</p>
    </section>
    <section>
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Contact us today!</p>
    </section>
</body>`,
    `<section> is like a folder where you group related content together on your webpage. It helps organize your webpage into different sections, like "About Us", "Our Products", and "Contact Us", making it easier for visitors to find what they're looking for.`),

    new BrowserItem("<p> paragraph", "Defines a paragraph of text.",
    `<body>
    <p>This is a paragraph, the most common element used for text.</p>
</body>`,
    `<p> is the most common container for text on your webpage. It's where you put paragraphs of information, like descriptions or explanations, making your webpage easy to read and understand. Additionally, it makes space between itself and other <p> elements by default.`),

    new BrowserItem("<ol> Ordered list", "Creates an ordered list.",
    `<body>
    <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ol>
</body>`,
    `<ol> creates an ordered (often refered to as numbered) list on your webpage. Great choice for a to-do list for example, where each item has a number. Inside <ol>, you must put <li> (list item) elements for each item you want to include in the list.`),

    new BrowserItem("<ul> Bulleted list", "Creates an unordered list.",
    `<body>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</body>`,
    `<ul> creates a bulleted list on your webpage. Similar to a shopping list, where each item is represented by a bullet point. Inside <ul>, you must put <li> (list item) elements for each item you want to include in the list.`),

    new BrowserItem("<li> List item", "Defines a list item.",
    `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>`,
    `<li> represents a single item in a list on your webpage. You use it inside <ul> or <ol> elements to create a bulleted or numbered list.`),

    new BrowserItem("<img> Image", "Inserts an image.",
    `<body>
    <img src="myFiles/image.jpg" alt="Description of the image">
</body>`,
    `<img> is like a window into another world on your webpage. It lets you add pictures, making it more interesting and engaging.
    
You use it with the 'src' attribute to specify the image file's location and the 'alt' attribute to provide a description of the image for people who can't see it, or in case it doesn't load. (More about attributes later on!)`),
    
new BrowserItem("<strong> Bold", "Makes text bold.",
    `<body>
    <p><strong>This text is bold.</strong></p>
</body>`,
    `Wrap the text with it to make it bold.`),

    new BrowserItem("<i> Italic", "Makes text italic.",
    `<body>
    <p><i>This text is italic.</i></p>
</body>`,
    `Wrap the text with it to make it italic`),
    
    new BrowserItem("Attributes", "Provides options for elements",
    `<section id="content">
    <h1 class="headers">Hello Internet!</h1>
</section>`,
    `As you can see from the example, elements can have attributes that provide options for them.

Attributes are always written in the format of [name="value"], like [id="main-heading"] or [class="headers"] after the opening tag of an element. With this information, the webpage can change the functionality or style of the element.

For example, the <section> element has the 'id' attribute, which makes it easy to identify it later in your code, or change its style. Another example is 'src', which is used to link an image to your webpage.`),

    new BrowserItem("'id'", "Identifies an element.",
    `<body>
    <h1 id="main-heading">Welcome to My Website</h1>
    <p>This is the main content of my website.</p>
</body>`,
    `The 'id' attribute helps you give a unique name to an element, like a special tag. It's like giving someone a name tag so you can easily find them in a crowd.
    
In the example, the <h1> element is given the 'id' of "main-heading", so you can easily refer to it later in your code.`),
    
    new BrowserItem("'class'", "Groups elements for styling.",
    `<html>
    <head>
        <title>My Website</title>
        <style>
            .highlight {
                background-color: yellow;
            }
        </style>
    </head>
    <body>
        <h1 class="highlight">Welcome to My Website</h1>
        <p class="highlight">This is the main content of my website.</p>
        <p>This is some additional content.</p>
    </body>
</html>`,
    `The 'class' attribute helps you group elements together, like putting them in the same club. It's like saying, "These elements belong together because they share something in common".
    
In the example, both <h1> and <p> elements have the class "highlight", so they'll have the same yellow background color according to the CSS style specified.`)
];

export const CSSDocs = [
    new BrowserItem("font-family", "Defines the font to be used for text.",
        `<style>
    body {
        font-family: Arial, sans-serif;
    }
</style>`,
        "`font-family` specifies the typeface or font family for text within an element. Multiple font names can be listed as fallbacks in case the browser doesn't support the first choice."),
        
    new BrowserItem("font-size", "Sets the size of text.",
        `<style>
    p {
        font-size: 16px;
    }
</style>`,
        "`font-size` adjusts the size of the text within an element. It can be specified in various units like pixels, em, rem, or percentages."),
    
    new BrowserItem("font-style", "Specifies the style of text.",
        `<style>
    p {
        font-style: italic;
    }
</style>`,
        "`font-style` sets the style of the text such as normal, italic, or oblique."),
        
    new BrowserItem("font-weight", "Sets the weight (thickness) of a font.",
    `<style>
    p {
        font-weight: bold;
    }
</style>`, 
    "`font-weight` sets the weight or thickness of a font. Values include `normal`, `bold`, `bolder`, `lighter`, or numeric values like 100, 200, etc."),
    
    new BrowserItem("color", "Sets the color of text.",
        `<style>
    p {
        color: blue;
    }
</style>`,
        "`color` changes the color of text within an element. You can use color names, hex codes, RGB, or HSL values to specify colors."),

    new BrowserItem("text-align", "Specifies the horizontal alignment of text.",
        `<style>
    div {
        text-align: center;
    }
</style>`,
        "`text-align` determines how text is horizontally aligned within its container. Values include `left`, `right`, `center`, and `justify`."),
        
    new BrowserItem("line-height", "Sets the height of a line of text.",
    `<style>
    p {
        line-height: 1.5;
    }
</style>`, 
    "`line-height` sets the height of a line of text within an element. It can be specified as a unitless number, a percentage, or a length."),

    new BrowserItem("margin", "Sets the margin around an element.",
    `<style>
    div {
        margin: 20px;
    }
</style>`,
    "`margin` creates space around an element's border. It can be specified in various units like pixels, em, or percentages and can have different values for each side (top, right, bottom, left)."),

    new BrowserItem("padding", "Specifies the padding within an element.",
        `<style>
    div {
        padding: 10px;
    }
</style>`,
    "`padding` sets the space between the content of an element and its border. Like margin, it can be specified in various units and can have different values for each side."),

    new BrowserItem("border", "Defines a border around an element.",
        `<style>
    div {
        border: 1px solid black;
    }
</style>`,
    "`border` creates a border around an element. It can be specified with width, style, and color."),

    new BrowserItem("border-radius", "Rounds the corners of an element's border.",
    `<style>
    div {
        border-radius: 10px;
    }
</style>`, 
"`border-radius` rounds the corners of an element's border. It can be specified with a single value to round all corners equally, or separate values for each corner."),

    new BrowserItem("box-sizing", "Defines how the total width and height of an element is calculated.",
    `<style>
    div {
        box-sizing: border-box;
    }
</style>`,
"`box-sizing` determines whether an element's width and height include padding and borders. By default, the width and height exclude padding and borders, but `border-box` includes them in the calculation."),

    new BrowserItem("width", "Sets the width of an element.",
    `<style>
    div {
        width: 200px;
    }
</style>`, 
"`width` specifies the width of an element. It can be specified in various units like pixels, em, rem, or percentages."),

    new BrowserItem("height", "Sets the height of an element.",
    `<style>
    div {
        height: 100px;
    }
</style>`, 
"`height` specifies the height of an element. It can be specified in various units like pixels, em, rem, or percentages."),

    new BrowserItem("background-color", "Sets the background color of an element.",
    `<style>
    div {
        background-color: lightgray;
    }
</style>`,
"`background-color` sets the background color of an element. You can use color names, hex codes, RGB, or HSL values to specify colors."),

    new BrowserItem("background-image", "Sets the background image for an element.",
    `<style>
    body {
        background-image: url('background.jpg');
    }
</style>`,
"`background-image` sets the background image of an element. You can specify a URL to an image file to be used as the background. It's commonly used in the body or container elements to style the background of a webpage."),

    new BrowserItem("background-size", "Specifies the size of the background image.",
    `<style>
    body {
        background-image: url('background.jpg');
        background-size: cover;
    }
</style>`,
"`background-size` determines the size of the background image. Values like `cover`, `contain`, or specific dimensions can be used to control how the image fits the element's background area."),

    new BrowserItem("background-repeat", "Defines how the background image of an element is repeated.",
    `<style>
    body {
        background-image: url('background.jpg');
        background-repeat: no-repeat;
    }
</style>`,
"`background-repeat` determines the repetition rule of the background image. Values include `repeat`, `repeat-x`, `repeat-y`, `no-repeat`, `space` and `round`."),

    new BrowserItem("position", "Specifies the positioning method of an element.",
    `<style>
    div {
        position: relative;
    }
</style>`, 
"`position` specifies the positioning method of an element. Values include `static`, `relative`, `absolute`, `fixed`, and `sticky`. It's commonly used in conjunction with top, right, bottom, and left properties to precisely place elements on the page."),

    new BrowserItem("float", "Specifies whether an element should float to the left, right, or none.",
    `<style>
    img {
        float: left;
    }
</style>`, 
"`float` specifies whether an element should float to the left, right, or none. Floated elements are removed from the normal flow of the document and positioned to the left or right of their containing element."),

    new BrowserItem("overflow", "Controls what happens when content overflows its container.",
    `<style>
    div {
        overflow: auto;
    }
</style>`,
"`overflow` specifies how content that overflows the element's box should be handled. It can be set to `auto`, `scroll`, `hidden`, or `visible`, among others."),
];

export const JSDocs = [
    new BrowserItem("Unavailable in demo",
    "JS is not supported in the demo",
    `<script>
    alert("Uh oh, something's missing!");
</script>`,
    "No details yet.")
];