import React, { useState, useEffect } from 'react';
import '../assets/styles/App.css';
import frogImg from '../assets/images/FROG.png';

const TITLE = 'HOW TO OPERATE YOUR FROG';
const TIP_TITLE = 'CLICK FROG FOR ANOTHER TIP';
const LOAD_MESSAGE = 'Loading...';

const AppHook: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState(new Array());

  useEffect(() => {
    setLoading(true);
    fetch('https://frog.tips/api/3/tips', {
      method: 'GET',
      headers: new Headers({
        Authorization: "Basic NGNlZmRjNWEtYjZhMC00ZmRiLThjYTYtODA0YjY5ZTliMGRjOmVYUTIyY3dzTnprZjdiaWs2QXorOWdYSUxxeGgxcWx4UUJqTlE2T0Y3blhxakhwM3ZXaVFJR2lnOWhIdXlLMUhxL2JDQjNGYnhjL2RBclZXcDkwL0FRPT0="
      })
    })
    .then(res => res.json())
    .then((data) => {
      setLoading(false);
      setTips([...tips, ...data]);
    })
  }, [(counter + 5 >= tips.length)]);

  const currentTip = tips[counter];

  return (
    <div className="main-container">
      <h1 className="title">{TITLE}</h1>
      <img
        alt="Frog"
        className="image"
        src={frogImg}
        onClick={() => !loading && setCounter(counter + 1)}
      />
      <div className="tip-container">
        <div className="tip-title">{TIP_TITLE}</div>
        {loading || !currentTip ?
            <p className="loader">{LOAD_MESSAGE}</p>
          :
            [
              <div className="tip-number" key={currentTip.id}>{`TIP ${currentTip.id}`}</div>,
              <div className="tip" key={currentTip.tip}>{currentTip.tip}</div>
            ]
        }
      </div>
    </div>
  );
}

export default AppHook;
