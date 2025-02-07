import { useEffect, useState, useRef } from 'react'
import myGPT3 from './assets/images/my-gpt3.png';
import user2 from './assets/images/user2.png';
import GPT from './assets/images/ChatGPT_logo.png';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSave, faRocket, faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import getGPTResponse from './gemini';



function App() {
  const end = useRef(null);
  const [input, setInput] = useState('');
  const [massage, setMassage] = useState([]);

  useEffect(() => {
    end.current.scrollIntoView();
  }, [massage]);

  const handelSend = async () => {
    if (!input) return;
    setMassage([...massage, { text: input, isBot: false }]);
    const prompt = await getGPTResponse(input);
    console.log('Prompt - ',prompt);
    setMassage([
      ...massage,
      { text: input, isBot: false },
      { text: prompt, isBot: true }
    ]);
  }

  const handelEnter = async (e) => {
    if (e.key === 'Enter') {
      console.log(e.key);
      await handelSend();
    }
  }

  const handleQuery = async (e) => {
    const newinput = e.target.value;
    if (!e.target.value)return;
    setMassage([...massage, { text: newinput, isBot: false }]);
    const prompt = await getGPTResponse(newinput);
    console.log('Prompt - ',prompt);
    setMassage([
      ...massage,
      { text: newinput, isBot: false },
      { text: prompt, isBot: true }
    ]);
  }

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="left-top">
            <div className="logo">
              <img src={myGPT3} alt="My-Chat-Logo" />
              <h1>My-GPT</h1>
            </div>
            <button className='btn' onClick={()=> window.location.reload()}><span>+</span> New Chat</button>
            <div className="text-button">
              <button className="text-btn" onClick={handleQuery} value={'What is Programming?'}>

                <FontAwesomeIcon icon={faMessage} />
                <span>What is Programming?</span>
              </button>
              <button className="text-btn" onClick={handleQuery} value={'AI vs Coding?'}>

                <FontAwesomeIcon icon={faMessage} />
                <span>AI vs Coding?</span>
              </button>
              <button className="text-btn" onClick={handleQuery} value={'What is API?'}>
                <FontAwesomeIcon icon={faMessage} />
                <span>What is API?</span>
              </button>
            </div>
          </div>
          <div className="left-bottom">
            <div className="home">
              <FontAwesomeIcon icon={faHouse} className='home-icon' />
              <a href="#">Home</a>
            </div>
            <div className="home">
              <FontAwesomeIcon icon={faSave} className='home-icon' />
              <a href="#">Save</a>
            </div>
            <div className="home">
              <FontAwesomeIcon icon={faRocket} className='home-icon' />
              <a href="#">Upgrade</a>
            </div>
          </div>
        </div>

        {/* === Right Part === */}


        <div className="right">
          <div className="chats">
            {massage.map((msg, index) => (
              <div className={msg.isBot ? 'bot txt' : 'query txt'} key={index}>
                <img src={msg.isBot ? GPT : user2} alt="user img" className={msg.isBot ? 'botimg' : 'userimg'} />
                <span>{msg.text}</span>
              </div>
            ))}
            <div ref={end}></div>
          </div>
          <div className="footer">
            <div className="massage-btn">
              <input type="text" className="input-value" onKeyDown={handelEnter} placeholder='Send a message' value={input} onChange={(e) => setInput(e.target.value)}></input>
              <button className="send-btn" onClick={handelSend}>
                <FontAwesomeIcon icon={faPaperPlane} className='plan-icon' />
              </button>
            </div>
            <p>Created By Rishav Tiwari</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
