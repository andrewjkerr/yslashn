import React, { Component } from 'react';
import { NICE, SUPER_NICE , BASE_API} from './colors';

class Home extends Component {
  render() {
    return (
      <div className="container">
      <h1 className="center-align">CROWDS</h1>
      <h2 className = "center-align">Local crowdsourced answers to yes/no questions</h2>
      <div className="input-field">
      <input type="text" placeholder = "(xxx)-xxx-xxxx"/>
      </div> 
      <h5>Text me the app</h5>
      <h4 className="center-align">Try Crowds on Web</h4>
      <a className="waves-effect waves-light btn">Login</a>
      </div>
      );
  }
}

class WebApp extends Component {

}

var Search = React.createClass({
  render: function(){
    <div className="asdf">
    Error
    </div>
  }
});

var SearchListing = React.createClass({
  getInitialState:function(){
    return {searchString: "",
    events: []};
  },

  componentDidMount:function(){
    $.get(BASE_API + '/events', function(result) {
      console.log(result);
      this.setState({
        events: result.events
      });
    }.bind(this));
  },

  handleChange:function(e){
    this.setState({searchString: e.target.value});
  },

  render: function(){
    var events = this.state.events,
    searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){

            // We are searching. Filter the results.

            events = events.filter(function(l){
              return l.name.toLowerCase().match( searchString );
            });

          }

          return (
            <div>
            <div className="input-field">
            <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
            </div>
            <ul> 

            { events.map(function(l){
              return <li id={l.id}><a href={l.id}>{l.name}</a></li>
            }) }

            </ul>

            </div>

            ); 
        }
      })

const App = React.createClass({
  getInitialState() {
    return {
      route: window.location.hash.substr(1)
    }
  },

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  },

  render() {
    let Child
    switch (this.state.route) {
      case '/events': Child = SearchListing; break;
      default:      Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/events">Events</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
})

React.render(<App />, document.body)
