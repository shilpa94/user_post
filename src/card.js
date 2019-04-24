import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card,CardHeader, CardMedia, CardContent, CardActions,Collapse, IconButton, Typography, Grid} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comments from './comments';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: [],
      expanded: false
    };
  }
   
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    var cardStyle = {
       maxWidth:500,
       height:150,
       margin:20
    }
    var post = this.props.post;
    return (
        <Card style={cardStyle}>
          <CardContent>
            <p>{post.title}</p>
          </CardContent>
          <CardActions >
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <Comments post_id={post.id} />
          </Collapse>
        </Card> 
    );
  }
}

export default Cards;
