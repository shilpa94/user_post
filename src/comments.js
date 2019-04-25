import React, { Component } from 'react';
import {CardContent, Typography } from '@material-ui/core';

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
    var commentStyle={
      background:"#fce4ec",
      borderRadius: "10px",
      margin:"20px"
    }
    return(
      <CardContent>
        <Typography>
          { this.state.comments.map(
            cmt => 
              (
                <Typography style={commentStyle}>{cmt.body}</Typography>
              )
            )
          }
        </Typography>
      </CardContent>
    );  
  }
}

export default Comments;
