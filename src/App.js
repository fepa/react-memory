import React from 'react';
import CardList from './CardList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.baseState();
  }

  baseState() {
    return { finished: false, count: 5, matchedPairs: {}, activeCards: [], imageURL: "https://placekitten.com/100/100?image=" };
  }

  setCountHandler(event) {
    let state = this.baseState();
    state.count = event.target.value;
    this.setState(state);
  }

  setActive(card) {
    // eslint-disable-next-line
    if(this.state.activeCards.length == 2) {
      this.setState({ activeCards: [card] });
    } else {
      this.setState((prevState) => {
        let state = { activeCards: prevState.activeCards };
        state.activeCards.push(card);
        return state;
      });
    }
  }

  setImageService(event) {
    this.setState({ imageURL: event.target.value });
  }

  clearActive() {
    this.setState({ activeCards: [] });
  }

  resetHandler(event) {
    this.setState(this.baseState());
  }

  imageURL(index) {
    return this.state.imageURL + index;
  }

  finishGame() {
    this.setState({ finished: true });
  }

  setMatch(pairing) {
    this.setState(prevState => {
      prevState.matchedPairs[pairing] = true;
      return prevState;
    }, () => {
      // eslint-disable-next-line
      if(Object.keys(this.state.matchedPairs).length == this.state.count) {
        this.finishGame();
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Memory</h1>
          <p>Click the cards and try to pair them</p>
        </header>
        <p>
          <input type="range" onChange={this.setCountHandler.bind(this)} value={this.state.count} step="1" max="10" min="1" /> {this.state.count * 2}
        </p>
        <p>
          <input type="button" onClick={this.resetHandler.bind(this)} value="Restart game" />
        </p>
        <p>
          <select onChange={this.setImageService.bind(this)}>
            <option value="https://placekitten.com/100/100?image=">placekitten.com</option>
            <option value="https://picsum.photos/100/100?image=">picsum.photos</option>
          </select>
        </p>

        <CardList count={this.state.count} imageURL={this.imageURL.bind(this)} finished={this.state.finished} matchedPairs={this.state.matchedPairs} setMatch={this.setMatch.bind(this)} activeCards={this.state.activeCards} setActive={this.setActive.bind(this)} clearActive={this.clearActive.bind(this)} />
      </div>
    );
  }
}

export default App;
