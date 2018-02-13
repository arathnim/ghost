import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import { Grid, Row, Col } from 'react-flexbox-grid';

class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {philosophy1: "foo"};
    fetch("blog/philosophy").then(x => x.json()).then(x => {this.setState({philosophy1: x})})
  }

  render() {
    if (this.state.philosophy1 == "foo") {
      return <div />
    }
    return (
      <div>

        <div className={styles.essayfullbacking} style={{ backgroundColor: "#222"}}>
          <div className={styles.essaytitle} style={{ fontWeight: 400 }}>Philosophy</div>
          <div className={styles.essaytitle} style={{ fontSize: '2em' }}>From Wikipedia, the free encyclopedia</div>
        </div>

        <div className={styles.essaybacking} style={{ backgroundColor: "#8aa9ab"}}>
          <span className={styles.sectionnumbers}>I</span>
          <div className={styles.sectiontitle}>Introduction</div>
        </div>

        <div className={styles.essaysection} dangerouslySetInnerHTML={{ __html: this.state.philosophy1.content }} />

        <div className={styles.essaybacking} style={{ backgroundColor: "#8aa9ab"}}>
          <span className={styles.sectionnumbers}>II</span>
          <div className={styles.sectiontitle}>Historical Overview</div>
        </div>

        <div className={styles.essaysection} dangerouslySetInnerHTML={{ __html: this.state.philosophy1.content }} />

      </div>
    );
  }
}

export default Essay
