import './App.css';
import { useState,useEffect,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'

function App() {

  let colors = ['#16a085','#27ae60','#2c3e50','#f39c12','#e74c3c','#9b59b6','#FB6964','#342224','#472E32','#BDBB99','#77B1A9','#73A857'];
  const isMounted=useRef(false);
  let [quote,setQuote]=useState('');
  let [author,setAuthor]=useState('');

  async function fetchData(){
    const respone=await fetch("https://api.quotable.io/quotes/random");
    const data=await respone.json();
    // eslint-disable-next-line
    data.map((i)=>{return setQuote(i.content),setAuthor(i.author);
    });
    changeColorToRandom();
    }

  useEffect(()=>{
    if(!isMounted.current)
    {
    fetchData();
    isMounted.current=true;
    }
     // eslint-disable-next-line
  },[]);

  let changeColorToRandom = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor=colors[randomIndex];
    document.documentElement.style.setProperty('--color', randomColor);
  };

  return (
      <div id="quote-box">
        <div id="text"><FontAwesomeIcon icon={faQuoteLeft} size="lg"/> {quote} </div>
        <div id="author">- {author}</div>
        <div id="bottom">
          <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_top"><FontAwesomeIcon icon={faSquareTwitter} size="2xl"/></a>
          <button id="new-quote" onClick={fetchData}>New Quote</button>
        </div>
      </div>
  );
}

export default App;
