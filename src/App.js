import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Posts from './posts';
import Home from './home';
import PropTypes from 'prop-types';
import { withStyles, Typography, AppBar, Toolbar, SvgIcon} from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h5" color="inherit">
                User Details
              </Typography>
              <Link to={'/'}>
                <SvgIcon style={{color:"white", marginLeft:"80%"}}>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
        <div>
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
