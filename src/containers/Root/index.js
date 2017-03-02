import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getSceneCount } from '../../reducers/scenes';
import { isBlitzing } from '../../reducers/blitz';

class Root extends Component {

  static propTypes = {
    loadProgress: React.PropTypes.number.isRequired,
    scenes: React.PropTypes.array.isRequired,
    ready: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  handleBlitzClick = (e) => {
    e.preventDefault();
    if(this.props.blitz) {
      this.props.actions.stopBlitz();
    } else {
      this.props.actions.startBlitz();
    }
  }

  componentDidMount() {
    //kickoff image load
    this.props.actions.preload();
  }



  render() {
    //render load progress, readyState


    return(
      <div className="site-container">
        <h1>Corndog day 2017</h1>
        <h2>load progress</h2>
        <p> { Math.floor(this.props.loadProgress * 100) }</p>
        <h2>ready</h2>
        <p> { this.props.ready.toString() } </p>

        {this.props.ready &&
          <a href="#" onClick={this.handleBlitzClick}>{
            this.props.blitz ? "stop" : "start"
          }</a>
        }
        <h2>active index</h2>
        <p> { this.props.activeSceneIndex }</p>
        <h2> images </h2>
        <p>
          <img alt="corndog" src={this.props.scenes[this.props.activeSceneIndex].srcDataURL} width="100%" />
        </p>
      </div>
    );

  }
}

const mapStateToProps = (state) => {

  const {preload, scenes, blitz} = state;

  return {
    ...state,
    loadProgress: (preload / getSceneCount(scenes)),
    blitz: isBlitzing(blitz)
  }
};

export default connect(
  mapStateToProps,
  actions,
  (stateProps, dispatchProps) => {
    return {
      ...stateProps,
      actions: dispatchProps
    }
  }
)(Root);
