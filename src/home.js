import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Modal, Button} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Posts from './posts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: [],
      open: false,
      modalUser: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            user: result
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleOpen = (u) => {
    this.setState({ open: true, modalUser: u});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    var tableStyle = {
      // minWidth: 200
    }
    var paperStyle = {
      margin: 40,
    }
    var modalStyle = {
      top: '10%',
      left: '10%'

    }

    var paper = {
      width: '50%',
      height: '80%',
      backgroundColor: "white",
      
    }

    const { error, isLoaded, user } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
            <Paper style={paperStyle}>
              <Table style={tableStyle}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell>
                        <Button onClick={() => this.handleOpen(u)}>show</Button>
                      </TableCell>
                      <TableCell>
                        <Link to={{pathname:'/posts&user_id='+ u.id + ''}}>posts</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Modal
              style={modalStyle}
              open={this.state.open}
              onClose={this.handleClose} >   
              <div style={paper}>
              <Typography>
                Name:{this.state.modalUser.name}<br/>
                Username:{this.state.modalUser.username}<br/>
                Email:{this.state.modalUser.email}<br/>
                Website:{this.state.modalUser.website}
              </Typography>
              </div>
            </Modal>
          </div>
        );
      }
    }
  }

export default Home;
