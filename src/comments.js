import React, { Component } from 'react';
import {Card,CardHeader, CardMedia, CardContent, CardActions,Collapse, Avatar, IconButton, Typography } from '@material-ui/core';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/comments?postId="+ this.props.post_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            comments: result
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

  render() {
    return(
      <CardContent>
        <Typography paragraph>
          { this.state.comments.map(
            cmt => 
              (
                <p>{cmt.body}</p>
              )
            )
          }
        </Typography>
      </CardContent>
    )  
  }
}

export default Comments;
