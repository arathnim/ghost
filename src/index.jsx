import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import './style.sass'

import history from './history'

import Header from './containers/Header'
import Blog from './containers/Blog'
import Post from './containers/Post'
import Essay from './containers/Essay'

class Init extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentpage: history.location.hash};
    history.listen((location, action) => {
      this.setState({currentpage: location.hash})
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header active={this.state.currentpage} />
          <Switch>
            <Route exact path="/blog" component={Blog} />

            <Route exact path="/blog/:path" component={Post} />

            <Route exact path="/essays" component={Essay}/>

            <Redirect exact from="/" to="/blog" />

          </Switch>
        </div>
      </Router>
    );
  }
}

document.title = "Arathnim"

render(<Init />, document.getElementById('main'))
