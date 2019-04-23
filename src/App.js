import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Posts from './posts';
import Home from './home';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome</h2>
            <Link to={'/'}>Home</Link>
            <Link to={'/posts'}>posts</Link>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/posts' component={Posts} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
