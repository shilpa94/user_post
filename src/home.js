import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper,
        Typography, Modal, Button, Avatar, List, ListItem, ListItemText} from 
        '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Divider from '@material-ui/core/Divider';
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
    var av = {
       color: '#fff',
    backgroundColor: deepPurple[500],
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
    var list = {
      height:'25px'
    }
    var divider = {
      margin:" 20px"
    }
    var street = "";
    var city = "";
    var zipcode = "";
    var suite = "";
    if (this.state.modalUser.address !== undefined) {
      var street = this.state.modalUser.address.street
      var suite = this.state.modalUser.address.zipcode
      var city = this.state.modalUser.address.city
      var zipcode = this.state.modalUser.address.zipcode
    }
    var company_name = "";
    var catchPhrase = "";
    var bs= "";
    if (this.state.modalUser.company !== undefined) {
      var company_name = this.state.modalUser.company.name
      var catchPhrase = this.state.modalUser.company.catchPhrase
      var bs= this.state.modalUser.company.bs
    }

    // console.log(this.state.modalUser);
    const { error, isLoaded, user } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
            <Paper style={paperStyle}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell variant="h5">Name</TableCell>
                    <TableCell variant="h5">Phone</TableCell>
                    <TableCell variant="h5">Posts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <Avatar style={av} onClick={() => this.handleOpen(u)}>{(u.name).match(/\b(\w)/g).join('')}
                        </Avatar>
                      </TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell>
                        <Link to={{pathname:'/posts', state: { user_id: u.id}}}>posts</Link>
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
                <List>
                  <ListItem style={list}>
                    Name : {this.state.modalUser.name}
                  </ListItem>
                  <ListItem style={list}>
                    Username : {this.state.modalUser.username}
                  </ListItem>
                  <ListItem style={list}>
                    Email : {this.state.modalUser.email}
                  </ListItem>
                  <Divider component="li" style={divider} />
                  <ListItemText primary="Address"/>
                  <ListItem style={list}>
                    Street : {street}
                  </ListItem>
                  <ListItem style={list}>
                    Suite : {suite}
                  </ListItem>
                  <ListItem style={list}>
                    City : {city}
                  </ListItem>
                  <ListItem style={list}>
                   Zipcode : {zipcode}
                  </ListItem>
                  <Divider component="li" style={divider}/> 
                  <ListItemText primary="Work"/>
                  <ListItem style={list}>
                    Company : {company_name}
                  </ListItem>
                  <ListItem style={list}>
                   Website : {this.state.modalUser.website}
                  </ListItem>
                  <ListItem style={list}>
                   catchPhrase : {catchPhrase}
                  </ListItem>
                  <ListItem style={list}>
                    bs: {bs}
                 </ListItem>
                </List>
              </div>
            </Modal>
          </div>
        );
      }
    }
  }

export default Home;
