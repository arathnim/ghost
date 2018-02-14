import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import Divider from './Divider'

import { Grid, Row, Col } from 'react-flexbox-grid';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: "foo"};
    fetch("about.json").then(x => x.json()).then(x => {this.setState({data: x})})
  }

  render() {
    if (this.state.data == "foo") {
      return <div />
    }
    return (
        <div className={styles.content}>
          <div className={styles.contentheader}>
            <div className={styles.h2}>About</div>
            <div style={{ fontWeight: '300', marginBottom: '30px'}}>Bio and Contact Information</div>
            <Divider />

            <div>

              <div style={{ display: 'flex', marginTop: '10px', marginBottom: '30px'}}>

                <div style={{ width: '200px', minWidth: '200px', marginRight: '70px', marginTop: '18px', textAlign: 'left'}}>
                    <div style={{marginBottom: '0.2em'}}><a href="mailto:arathnim@gmail.com">Email</a></div>
                    <div style={{marginBottom: '0.2em'}}><a href="https://cybre.space/web/accounts/38809">Mastodon</a></div>
                    <div style={{marginBottom: '0.2em'}}><a href="">Twitter</a></div>
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

export default About
