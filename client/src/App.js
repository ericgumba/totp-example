import React, { Component } from 'react'; 
import './App.css';
class App extends Component {

  constructor () {
    super();
    this.state = {
      token: '',
      secret: '',
      password: '',
      responseToPost: ''
    };
  }
  componentDidMount() {
    this.callApi()
      .then(res => { 
        console.log(res)
        this.setState({ token: res.token, secret: res.secret })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json(); 
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: this.state.password }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
render() {
    return (
      <div className="App"> 
        <p> Token: {this.state.token}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Enter Passcode:</strong>
          </p>
          <input
            type="text"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;
