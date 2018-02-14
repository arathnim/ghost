import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import history from '../history'

import Divider from './Divider'
import ProjectTeaser from './ProjectTeaser'

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {meta: []};
    fetch('project-meta.json').then(x => x.json()).then(x => {this.setState({meta: x})})
  }

  render() {
    return (
        <div className={styles.content}>
          <div className={styles.contentheader}>
            <div className={styles.h2}>Projects</div>
            <div style={{ fontWeight: '300', marginBottom: '30px'}}>Libraries and code</div>
            <Divider />
            {this.state.meta.map(x => <ProjectTeaser post={x} />)}
          </div>
        </div>
    );
  }
}

export default Projects
