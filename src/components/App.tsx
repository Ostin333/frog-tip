import React, { Component } from 'react';
import '../assets/styles/App.css';
import frogImg from '../assets/images/FROG.png';

type Props = {
}

type State = {
  counter: number,
  error: any,
  loading: boolean,
  tips: Array<any>
}

const TITLE = 'HOW TO OPERATE YOUR FROG';
const TIP_TITLE = 'CLICK FROG FOR ANOTHER TIP';
const LOAD_MESSAGE = 'Loading...';

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0,
      error: null,
      loading: true,
      tips: []
    }
  }

  componentDidMount() {
    this.getTip();
  }

  getTip = () => {
    this.setState({ loading: true });
    fetch('https://frog.tips/api/3/tips', {
      method: 'GET',
      headers: new Headers({
        Authorization: "Basic NGNlZmRjNWEtYjZhMC00ZmRiLThjYTYtODA0YjY5ZTliMGRjOmVYUTIyY3dzTnprZjdiaWs2QXorOWdYSUxxeGgxcWx4UUJqTlE2T0Y3blhxakhwM3ZXaVFJR2lnOWhIdXlLMUhxL2JDQjNGYnhjL2RBclZXcDkwL0FRPT0="
      })
    })
    .then(res => res.json())
    .then((data) => {
      const { tips } = this.state;
      this.setState({ loading: false, tips: [...tips, ...data] });
    })
    .catch(error => this.setState({ error }))
  }

  renderCurrentTip = () => {
    const { counter, tips } = this.state;
    if(counter >= tips.length) {
      this.getTip();
      return null;
    }
    const currentTip = tips[counter];
    return [
      <div className="tip-number" key={currentTip.id}>{`TIP ${currentTip.id}`}</div>,
      <div className="tip" key={currentTip.tip}>{currentTip.tip}</div>
    ]
  }

  render() {
    const {
      counter,
      error,
      loading,
    } = this.state;

    if(error) {
      return <div className="main-container">
        <p className="error">{`Something went wrong. Try to reload page.`}</p>
      </div>
    }
    return (
      <div className="main-container">
        <h1 className="title">{TITLE}</h1>
        <img
          alt="Frog"
          className="image"
          src={frogImg}
          onClick={() => this.setState({ counter: counter + 1 })}
        />
        <div className="tip-container">
          <div className="tip-title">{TIP_TITLE}</div>
          {loading ?
              <p className="loader">{LOAD_MESSAGE}</p>
            :
              this.renderCurrentTip()
          }
        </div>
      </div>
    );
  }
}

export default App;
