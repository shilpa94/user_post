import React, { Component } from 'react';
import {CardContent, Typography } from '@material-ui/core';
import {randomColor} from 'randomcolor';

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

  commentsItem(cmt) {
    var color = randomColor();
    var commentStyle={
      background: String(color),
      borderRadius: "5px",
      margin:"20px"
    }
    return(
      <div style={commentStyle}>
       <Typography key={cmt.id}>{cmt.body}</Typography>
      </div>
    )
  }

  render() {
    return(
      <CardContent>
        <Typography>
          { this.state.comments.map(
            cmt => 
              (this.commentsItem(cmt))
            )
          }
        </Typography>
      </CardContent>
    );  
  }
}

export default Comments;
