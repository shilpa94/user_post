import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core/styles';
import Comments from './comments';
import Cards from './card';
// import { unstable_Box as Box } from '@material-ui/core/Box';
import { Container, Row, Col } from 'react-bootstrap';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    };
  }
  componentDidMount() {
    const {user_id} = this.props.location.state
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + user_id)
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

  render() {

    const { error, isLoaded, posts, comments } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
          <Container>
          <Row>
            {posts.map(p => (
              <Col xs={4}>
              <Cards post={p} /></Col>
            ))}</Row></Container>
          </div>
        );
      }
    }
}

export default Posts;
