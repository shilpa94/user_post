import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-bootstrap';
import Comments from './comments';
import Cards from './card';

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
            <Container className="d-flex flex-column align-items-center">
                {posts.map(p => (
                  <Cards key={p.id} post={p} />
                ))}
            </Container>
          </div>
        );
      }
  }
}

export default Posts;
