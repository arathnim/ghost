import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import Divider from './Divider'

import { Grid, Row, Col } from 'react-flexbox-grid';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: "foo"};
    fetch("projects/"+this.props.match.params.path).then(x => x.json()).then(x => {this.setState({data: x})})
  }

  render() {
    if (this.state.data == "foo") {
      return <div />
    }
    return (
        <div className={styles.content}>
          <div className={styles.contentheader}>
            <div className={styles.h2}>Projects</div>
            <div style={{ fontWeight: '300', marginBottom: '30px'}}>Libraries and code</div>
            <Divider />

            <div>

              <div style={{ display: 'flex', marginTop: '10px', marginBottom: '30px'}}>

                <div style={{ width: '200px', minWidth: '200px', marginRight: '70px', marginTop: '18px', textAlign: 'left'}}>
                    <Link to={"/projects/"}>
                      <div className={styles.posttitle}>{this.state.data.data.title}</div>
                    </Link>
                    <div className={styles.date}>{this.state.data.data.subtitle}</div>
                </div>

                  <div style={{ fontSize: '18px', fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: this.state.data.content }} />

              </div>

              <Divider />
            </div>

          </div>
        </div>



    );
  }
}

export default Project
