import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card,CardHeader, CardMedia, CardContent, CardActions,Collapse, IconButton, Typography, Grid} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comments from './comments';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
   
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    var cardStyle = {
       width:900,
       minHeight:150,
       margin:20
    }
    var post = this.props.post;
    return (
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" color="primary">{post.title}</Typography>
            <Typography>{post.body}</Typography>
          </CardContent>
          <CardActions >
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
            <Typography >Comments</Typography>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <Comments post_id={post.id} />
          </Collapse>
        </Card> 
    );
  }
}

export default Cards;
