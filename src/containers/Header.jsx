import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import { Grid, Row, Col } from 'react-flexbox-grid';

import FontAwesome from 'react-fontawesome'

import history from '../history'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.header}>

          <div>
            <div className={styles.title}>Arathnim</div>
            <div className={styles.subtitle}>words, code, etc.</div>
          </div>

          <div>

            <Link to="/blog">
              <div className={styles.navcontainer}>
                <span className={this.props.active.startsWith("#/blog") ? styles.navactive :  styles.navitem}>Blog</span>
              </div>
            </Link>

            <Link to="/essays">
              <div className={styles.navcontainer}>
                <span className={this.props.active.startsWith("#/essays") ? styles.navactive :  styles.navitem}>Essays</span>
              </div>
            </Link>

            <Link to="/projects">
              <div className={styles.navcontainer}>
                <span className={this.props.active.startsWith("#/projects") ? styles.navactive :  styles.navitem}>Projects</span>
              </div>
            </Link>

            <Link to="/about">
              <div className={styles.navcontainer}>
                <span className={this.props.active.startsWith("#/about") ? styles.navactive :  styles.navitem}>About</span>
              </div>
            </Link>

          </div>

          <div>
            <i className="fab fa-github"></i>
            <i className="fab fa-twitter"></i>
          </div>

        </div>
    );
  }
}

export default Header
