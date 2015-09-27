import React, { Component } from 'react';
import { NICE, SUPER_NICE , BASE_API} from './colors';

// not using an ES6 transpiler
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link

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
              return <li><a href='/events'+{l.id}>{l.name}</a></li>
            }) }

            </ul>

            </div>

            ); 
        }
      })

var EventPage = React.createClass({
  getInitialState:function(){

  },

  componentDidMount:function(){
    
  }
})

React.render((
  <Router>
    <Route path="/" component={Home}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="events/:eventId" component={EventPage}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)