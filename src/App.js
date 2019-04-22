import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

class App extends Component {
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
      // outline: 'none',
      // 'flex-direction': 'row',
      // 'justify-content': 'center',
      // 'flex-wrap': 'nowrap',
      // 'align-items': 'stretch',
      // 'align-content': 'stretch',
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
                {this.state.modalUser.name}
              </Typography>
              </div>
            </Modal>
          </div>
        );
      }
    }
  }


export default App;
