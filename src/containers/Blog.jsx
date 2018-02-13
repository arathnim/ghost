import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import history from '../history'

import Divider from './Divider'
import PostTeaser from './PostTeaser'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {meta: []};
    fetch('blog-meta.json').then(x => x.json()).then(x => {this.setState({meta: x})})
  }

  render() {
    return (
        <div className={styles.content}>
          <div className={styles.contentheader}>
            <div className={styles.h2}>Blog</div>
            <div style={{ fontWeight: '300', marginBottom: '30px'}}>Thoughts and notes</div>
            <Divider />
            {this.state.meta.map(x => <PostTeaser post={x} />)}
          </div>
        </div>
    );
  }
}

export default Blog
