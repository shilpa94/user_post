import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardHeader, CardMedia, CardContent, CardActions,Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { unstable_Box as Box } from '@material-ui/core/Box';
import Comments from './comments';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      expanded: false
    };
  }
    componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result
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

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    var cardStyle = {
       maxWidth: 400
    }
    console.log(this.props.user_id)
    const { error, isLoaded, posts, comments } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
            {posts.map(p => (
              <Card style={cardStyle}>
                <CardContent>
                 <p>{p.title}</p>
                </CardContent>
                <CardActions >
                  <IconButton
                    // className={classnames(classes.expand, {
                    //   [classes.expandOpen]: this.state.expanded,
                    // })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more">
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <Comments post_id={p.id} />
                </Collapse>
              </Card>
            ))}
          </div>
        );
      }
    }
}

export default Posts;
