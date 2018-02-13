import React from 'react'
import styles from '../style.sass'

import {
  Link
} from 'react-router-dom'

import history from '../history'

import { Grid, Row, Col } from 'react-flexbox-grid';

class Divider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Row between="xs">
              <Col>
                <div style={{ marginLeft:'8px', height: '1px', width: '200px', display: 'block', backgroundColor: 'rgba(0,0,0,0.2)'}} />
              </Col>
              <Col>
                <div style={{ marginRight: '8px', height: '1px', width: '550px', display: 'block', backgroundColor: 'rgba(0,0,0,0.2)'}} />
              </Col>
            </Row>
    );
  }
}

export default Divider
