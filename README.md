# Markdown to HTML converter

Markdown is a simple syntax used to generate formatted text. It’s used in lots of places, but the one most developers have probably encountered is README files in github.

This program converts a small subset of markdown to HTML. 

## Additional Comments

The program is a react application that converts markdown text into html tags and then converts it into a display on how it would look on the browser. Currently, the application works for the following:
- heading
- bold
- italic
- horizontal rule
- link

## Formatting Specifications

| Markdown                               | HTML                                              |
|----------------------------------------|---------------------------------------------------|
| `Heading 1`                            | `<h1>Heading 1</h1>`                              |
| `## Heading 2`                         | `Heading 2`                                       |
| `...`                                  | `...`                                             |
| `###### Heading 6`                     | `<h6>Heading 6</h6>`                              |
| `Unformatted text`                     | `<p>Unformatted text</p>`                         |
| `[Link text](https://www.example.com)` | `<a href="https://www.example.com">Link text</a>` |
| `Blank line`                           | `Ignored`                                         |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.