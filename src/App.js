import React, { Component } from 'react';
import { NICE, SUPER_NICE , BASE_API} from './colors';
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;


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

var App = React.createClass({
  render: function(){
    return (
      <Locations>
        <Location path="/" handler={Home} />
        <Location path = "/search" handler={SearchListing}/>
      </Locations>
    );
  }
})

var Search = React.createClass({
  render: function(){
    <div className="asdf">
    Error
    </div>
  }
});

var SearchListing = React.createClass({
  getInitialState:function(){
    return {
      searchString: "",
      events: []
    };
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
            return <li id={l.id}><a href={'event/' + l.id}>{l.name}</a></li>
          }) }
        </ul>
      </div>
    ); 
  }
})

var IndividualEventPage = React.createClass({
  getInitialState:function(){
    return {name: '', questions:[]};
  },

  componentDidMount:function(){

  },

  render:function(){
    return <h2>ERR</h2>;
  }
})



React.render(<App />, document.body)
