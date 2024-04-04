import { useContext, useEffect, useState } from "react"
import { windowContext } from "./desktop"
import { BrowserItem } from "./browserItem";
import { Editor } from "@monaco-editor/react";

const HTMLDocs = [
    new BrowserItem("HTML", "The <html> element is the main container for web content.",
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Webpage</title>
    </head>
    <body>
        <!-- Content goes here -->
    </body>
    </html>`,
    `The <html> element is like the main container for your web page. It's where you put all your content, like text, images, and links. It's kind of like the frame of a house that holds everything together.
    Inside the <html> element, you have other important sections. The <head> section is where you put important information about your webpage, like its title and any special instructions for browsers. The <body> section is where you put all the stuff that people actually see when they visit your webpage, like text, images, and videos.
    So, think of <html> as the big box that holds your entire webpage, and inside that box, you have smaller sections where you put specific types of information.`),

    new BrowserItem("HEAD", "Main container for webpage content.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
        <meta charset="UTF-8">
        <meta name="description" content="Welcome to my website!">
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <!-- Content goes here -->
    </body>
    </html>`, `The <head> element in HTML is where you stash important details about your webpage, but they're not directly visible. It's like the control room, managing things like the title that appears on the browser tab, the character encoding for your text, and descriptions for search engines. It's where you lay the groundwork for how browsers and search engines interpret and display your webpage.`),

    new BrowserItem("STYLE", "Controls webpage styles.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
        <style>
            body {
                background-color: lightblue;
                font-family: Arial, sans-serif;
            }
            h1 {
                color: navy;
            }
            p {
                color: darkblue;
            }
        </style>
    </head>
    <body>
        <!-- Content goes here -->
    </body>
    </html>`, `<style> is like a wardrobe for your webpage. It's where you dress up your content with colors, fonts, and layouts to make it look good.`),

    new BrowserItem("TITLE", "Defines webpage title.", `<!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to My Website</title>
    </head>
    <body>
        <!-- Content goes here -->
    </body>
    </html>`, `<title> sets the name of your webpage. It's like the title of a book, helping people understand what your webpage is about when they see it in their browser tab.`),

    new BrowserItem("H1-H6", "Defines heading levels.", `<!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to My Website</title>
    </head>
    <body>
        <h1>Main Heading</h1>
        <h2>Subheading 1</h2>
        <h3>Subheading 2</h3>
        <h4>Subheading 3</h4>
        <h5>Subheading 4</h5>
        <h6>Subheading 5</h6>
    </body>
    </html>`, `<h1> to <h6> are like different sizes of titles for your webpage content. <h1> is the biggest and most important, like the main title of a book, and <h6> is the smallest, like a subsection title. They help organize your content and make it easier for readers to understand the structure of your webpage.`),

    new BrowserItem("SECTION", "Groups related content.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <section>
            <h1>About Us</h1>
            <p>Welcome to our website! We are dedicated to providing quality products and excellent customer service.</p>
        </section>
        <section>
            <h2>Our Products</h2>
            <p>Explore our wide range of products designed to meet your needs.</p>
        </section>
        <section>
            <h2>Contact Us</h2>
            <p>Have questions or feedback? Contact us today!</p>
        </section>
    </body>
    </html>`, `<section> is like a folder where you group related content together on your webpage. It helps organize your webpage into different sections, like "About Us," "Products," and "Contact Us," making it easier for visitors to find what they're looking for.`),

    new BrowserItem("P", "Defines a paragraph of text.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
        <p>This is a paragraph of text. It provides information about the website or its content.</p>
    </body>
    </html>`, `<p> is like a container for text on your webpage. It's where you put paragraphs of information, like descriptions or explanations, making your webpage easy to read and understand.`),

    new BrowserItem("OL", "Creates an ordered list.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
        <p>This is a list of items:</p>
        <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ol>
    </body>
    </html>`, `<ol> creates a numbered list on your webpage. It's like making a to-do list, where each item has a number. Inside <ol>, you put <li> (list item) for each item you want to include in the list.`),

    new BrowserItem("UL", "Creates an unordered list.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
        <p>This is a list of items:</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </body>
    </html>`, `<ul> creates a bulleted list on your webpage. It's like making a shopping list, where each item is represented by a bullet point. Inside <ul>, you put <li> (list item) for each item you want to include in the list.`),

    new BrowserItem("LI", "Defines a list item.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
        <p>This is a list of items:</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </body>
    </html>`, `<li> represents a single item in a list on your webpage. It's like writing each item on your shopping list or to-do list. You use it inside <ul> or <ol> to create a bulleted or numbered list.`),

    new BrowserItem("IMG", "Inserts an image.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
        <img src="image.jpg" alt="Description of the image">
    </body>
    </html>`, `<img> is like a window into another world on your webpage. It lets you add pictures to your webpage, making it more interesting and engaging. You use it with the src attribute to specify the image file's location and the alt attribute to provide a description of the image for people who can't see it.`),
    
    new BrowserItem("ID", "Identifies an element.", `<!DOCTYPE html>
    <html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1 id="main-heading">Welcome to My Website</h1>
        <p>This is the main content of my website.</p>
    </body>
    </html>`, `The id attribute helps you give a unique name to an element, like a special tag. It's like giving someone a name tag so you can easily find them in a crowd. In the example, the <h1> element is given the id of "main-heading", so you can easily refer to it later in your code.`),
    
    new BrowserItem("CLASS", "Groups elements for styling.", `<!DOCTYPE html>
    <html>
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
    </html>`, `The class attribute helps you group elements together, like putting them in the same club. It's like saying, "These elements belong together because they share something in common." In the example, both <h1> and <p> elements have the class "highlight", so they'll have the same yellow background color according to the CSS style specified.`)
];

const CSSDocs = [
    new BrowserItem("title", "SHORT DESC", `EXAMPLEEEEEEEEEEEE`, `DETAILED DESC`)
];

const JSDocs = [
    new BrowserItem("Unavailable in demo", "JS is not supported in the demo", ``, "")
];

function generateDocPage(browserItem) {
    const docContent = document.getElementById("doc-content");
    if (!docContent) return;

    docContent.childNodes.forEach(child => {
        docContent.removeChild(child);
    });

    let out = []

    out.push(<h1>{browserItem.title}</h1>);
    out.push(<h2>{browserItem.short}</h2>);
    out.push(<Editor className="doc-example" defaultLanguage="html" theme="vs-dark" value={browserItem.example} options={{ readOnly: true, scrollbar: false, scrollBeyondLastLine: false, lineNumbers: false, minimap: {enabled: false}, renderLineHighlight: false}} />);
    out.push(<p>{browserItem.detailed}</p>)

    docContent.appendChild(`<h1>asd</h1>`);
}

export function BrowserPage() {
    const window = useContext(windowContext);
    const [page, setPage] = useState("docs");
    const [filter, setFilter] = useState([true, true, true]);
    const [selectedElement, setSelectedElement] = useState(-1);

    useEffect(() => {
        if (!document.getElementsByClassName("doc-example")[0]) return;
        document.getElementsByClassName("doc-example")[0].parentElement.style.height = `${"<div>\n\t<h1>Hello</h1>\n</div>".split('\n').length * 18 + 8}px`;
    }, [selectedElement])

    return (
        <div id='browser-page' className='pages' style={{display: window === "browser" ? "flex" : "none"}}>
            <ul id='browser-tabs'>
                <li onClick={() => setPage("docs")}>Documentation 📖</li>
                <li onClick={() => setPage("pc")}>PC Part Rankings 👑</li>
            </ul>
            {page === "docs" && 
            <div id='browser-content'>
                <ul id="doc-sidebar">
                    <li>
                        <p className={filter[0] ? "active" : ""} onClick={() => setFilter(curr => [!curr[0], curr[1], curr[2]])}>HTML</p>
                        <p className={filter[1] ? "active" : ""} onClick={() => setFilter(curr => [curr[0], !curr[1], curr[2]])}>CSS</p>
                        <p className={filter[2] ? "active" : ""} onClick={() => setFilter(curr => [curr[0], curr[1], !curr[2]])}>JS</p>
                    </li>
                    {filter[0] && 
                        <div>
                            <h1 style={{margin: 0}}>HTML</h1>
                            {HTMLDocs.map(e => <li key={e.title} onClick={() => {
                                generateDocPage(new BrowserItem("asd", "asd", "asd", "asd"));
                            }}>{e.title}</li>)}
                        </div>
                    }
                    {filter[1] && 
                        <div>
                            <h1 style={{margin: 0}}>CSS</h1>
                            {CSSDocs.map(e => <li key={e.title} >{e.title}</li>)}
                        </div>
                    }
                    {filter[2] && 
                        <div>
                            <h1 style={{margin: 0}}>JS</h1>
                            {JSDocs.map(e => <li key={e.title} >{e.title}</li>)}
                        </div>
                    }
                    {!filter.includes(true) &&
                        <li>No languages selected for filter</li>
                    }
                </ul>
                <div id="doc-content">

                </div>
            </div>
            }
            {page === "pc" && 
            <div id="browser-rankings">
                <p className='blocked-feature'>Feature not included in demo version</p>
            </div>
            }
        </div>
    )
}