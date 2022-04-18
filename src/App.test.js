import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { render, fireEvent,queryByTestId} from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders successfully', () => {
    const container = document.createElement('div');
    act(() => {
      const root = ReactDOMClient.createRoot(container);
      root.render(<App />);
      root.unmount(container);
    })
	});
});

describe('Text region exists', () => {
    it('valid input field', () => {
	  const html = render(<App />);
	  const textarea = html.queryByTestId('mdText');
      expect(textarea).toBeTruthy();
    });
});

describe('Enter sample markdown test #1', () => {
    it('test markdown converted html', () => {
	  const html = render(<App />);
	  const textarea = html.queryByTestId('mdText');
      fireEvent.change(textarea, { target: { value: "# This is an example format changer \n\n In addition, let us check how a link would convert. \n\n [Example Link](www.sample.com)" } })
	  const newHTML = html.queryByTestId('newHTML');
	  expect(newHTML).toHaveTextContent('<h1>This is an example format changer </h1><p> In addition, let us check how a link would convert. </p><p> <a href="www.sample.com">Example Link</a></p>');
    });
});
  
describe('Enter sample markdown test #2', () => {
    it('test markdown converted html', () => {
	  const html = render(<App />);
	  const textarea = html.queryByTestId('mdText');
      fireEvent.change(textarea, { target: { value: "# Sample Document\nHello!\n\nThis is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment." } })
	  const newHTML = html.queryByTestId('newHTML');
	  expect(newHTML).toHaveTextContent('<h1>Sample Document</h1><p>Hello!</p><p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>');
    });
});

describe('Enter sample markdown test #3', () => {
    it('test markdownconverted html', () => {
	  const html = render(<App />);
	  const textarea = html.queryByTestId('mdText');
      fireEvent.change(textarea, { target: { value: "# Header one\nHello there\n\nHow are you?\nWhat's going on?\n\n## Another Header\n\nThis is a paragraph [with an inline link](http://google.com). Neat, eh?\n\n## This is a header [with a link](http://yahoo.com)" } })
	  const newHTML = html.queryByTestId('newHTML');
	  expect(newHTML).toHaveTextContent('<h1>Header one</h1><p>Hello there</p><p>How are you?</p>What\'s going on? <h2>Another Header</h2><p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p> <h2>This is a header <a href="http://yahoo.com">with a link</a></h2>');
    });
});