import Head from 'next/head';
import { useState } from 'react';
import { LinkedinShareButton } from "react-share"; 

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  return (
    <div className="root">
      <Head>
        <title>AI LinkedIn Announcer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>announce things on LinkedIn with ease</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              you like to announce things on LinkedIn, but you're tired of the
              writing that comes with it? Use AI to announce your
              accomplishments, so you can focus on building your career. So you
              have more things to annouce, faster.
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="I will start as an associate at Cherry Ventures in 2023"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : "generate-button" }
              onClick={callGenerateEndpoint}
              >
              <div className="generate">
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Your Announcement</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
                <LinkedinShareButton
                  title='Hey you fuckers'
                  summary='This is a linkedin post'
                  source="this is the source"
                  url='www.google.com'
                  children = {
                    <p><b>Share on LinkedIn</b></p>
                  }
                  />
              </div>
            </div>
          )}
        </div>
        <p className="made-by">💩 Made by Marvin Beckmann</p>
      </div>
    </div>
  );
};

export default Home;
