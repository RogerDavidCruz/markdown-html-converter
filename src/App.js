import React, {useState} from 'react';
import './App.css';
import parse from 'html-react-parser'; 

const App = () => {
    const [value, setValue] = useState('');
    const [htmlSize, setHtmlSize] = useState(0);
    const [parsedHtml, setParsedHtml] = useState('');

    const handleChange = event => {
        setValue(event.target.value);
    }

    const handleParsedHtml = (html)  => {
        setHtmlSize(html.length);
        setParsedHtml(parse(html), html.length);
    }

    const handleReset = () => {
        setValue('');
        setHtmlSize(0);
        setParsedHtml('');
    }

    const stringToRegex = (regex, replacement) => {
        return (str) => {
            return str.replace(regex, replacement);
        }
    }
    
    //Matching Markdown syntax with regex rules
    const headersRegex = /^(#{1,6}) (.*)$/gm;

    const paragraphRegex = /\n+(?!<h)(?!<ul>)(?!<hr)([^\n]+)\n/g;

    const bracketsRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
    
    const horizonLineRegex = /\n((\-{3,})|(={3,}))/g;

    const italicBoldRegex = /(\*{1,2})(.*?)\1/g;
    
    
    //converter functions to change lines into regex
    const headersconverter = (textAll, octothorp, textContent) => {
		return '\n<h' + octothorp.trim().length + '>' + textContent + 
		'</h' + octothorp.trim().length + '>';
	}

    const paragraphconverter = (textAll, textContent) => '<p>' + textContent + '</p>';

    const urlconverter = (textAll, title, URL) => '<a href="' + URL + '">' + title + '</a>';
    
    const horizonLineconverter = textAll => '\n<hr />';

    const italicBoldconverter = (textAll, asterisk, textContent) => {
        return '<' + (asterisk.trim().length===1 ? 'em' : 'strong') + '>' + 
		textContent + '</' + (asterisk.trim().length===1 ? 'em' : 'strong') + '>';
    }
    
    //helper functions to finalize string to regex
    const changeHeaders = stringToRegex(headersRegex, headersconverter);

    const changeParagraphs = stringToRegex(paragraphRegex, paragraphconverter);

    const changeURL = stringToRegex(bracketsRegex, urlconverter);

    const changeHorizontalLine = stringToRegex(horizonLineRegex, horizonLineconverter);

    const changeFontStyle = stringToRegex(italicBoldRegex, italicBoldconverter);


    const markdownModification = str => {
      return changeParagraphs(
        changeHorizontalLine(changeFontStyle(
            changeHeaders(changeURL(str)
            )))
        );
    }

    const markToHtmlconverter = str => {
        return markdownModification('\n' + str + '\n').trim();
    }

    const html = markToHtmlconverter(value);

    return (
    <div className="center">
        <div id="title">
            <h1>Markdown Format Converter</h1>
        </div>
        
        <div className="boxes">
            <div className="boxes">
                <h2>Markdown</h2>
                <textarea value={value} data-testid="mdText" onChange={handleChange} cols={80} rows={10} />
            </div>
            <div className="boxes">
                <h2>HTML</h2>
                <div data-testid="newHTML" className="htmlRegion">{html}</div>
            </div>
        </div>

		<br/>

        {value ? <button onClick={()=>handleParsedHtml(html)}>
            Format HTML </button> : ''}

        {(htmlSize !== html.length && htmlSize !== 0) ? 
            <button className="space" onClick={()=>handleReset()}>
                Reset</button>:''}
        
        <br/>
		<br/>

        {parsedHtml ? 
            <div className="boxes">
                <h2>Display</h2>
                <div data-testid="parsedHtml" className="displayRegion">{parsedHtml}</div>
            </div>
        : ''}

    </div>
    );  
}

export default App;
