import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import Divider from './Divider'

import { Grid, Row, Col } from 'react-flexbox-grid';

class ProjectTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

        <div className={styles.postteaser}>

          <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px'}}>

            <div style={{ width: '200px', minWidth: '200px', marginRight: '70px', marginTop: '18px', textAlign: 'left'}}>
                <Link to={"/projects/"+this.props.post.path}>
                  <div className={styles.posttitle}>{this.props.post.title}</div>
                </Link>
                <div className={styles.date}>{this.props.post.subtitle}</div>
            </div>

            <div>
              <p style={{ fontSize: '18px', fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: this.props.post.preview }} />
            </div>

          </div>

          <Divider />
        </div>

    );
  }
}

export default ProjectTeaser
