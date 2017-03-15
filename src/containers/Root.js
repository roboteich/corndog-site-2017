import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getBlitzedScene } from '../reducers';
import { isBlitzing } from '../reducers/blitz';
import Splash from '../components/Splash';
import Blitz from '../components/Blitz';
import Share from '../components/Share';
import Editor from '../components/Editor';
import FirstChild from '../components/FirstChild';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Root extends Component {

  static propTypes = {
    scenes: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  handleSplashStartClick = (e) => {
    this.props.actions.ready();
    this.props.actions.startBlitz();
  }

  handleBlitzToggle = () => {
    (this.props.blitz ?
      this.props.actions.stopBlitz() :
      this.props.actions.startBlitz())
  }


  componentDidMount() {
    //kickoff image load
    this.props.actions.preload();
    this.props.actions.measureScreen();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    console.log('handleResize');
    this.props.actions.measureScreen();
  }



  render() {
    //render load progress, readyState
    const activeSceneSrc = (this.props.activeScene) ? this.props.activeScene.srcDataURL : "";
    const activeSceneCompositeSrc = (this.props.activeScene) ? this.props.activeScene.compositeDataURL : null;
    const portraitOffset = this.props.activeScene.portraitOffset;
    const landscapeRepeat = this.props.activeScene.landscapeRepeat;

    return(
      <div className="site-container xs-full-height xs-fit">
        <header className="site-header">
        </header>
        <article className="site-content">
          <ReactCSSTransitionGroup component={FirstChild}
            transitionName="dissolve"
            transitionEnterTimeout={550}
            transitionLeaveTimeout={550}>
            { !this.props.ready && (
                <Splash onStartClick={this.handleSplashStartClick} />
            )}
          </ReactCSSTransitionGroup>
          <Blitz
            onBlitzToggle={this.handleBlitzToggle}
            srcURL={activeSceneSrc}
            compositeURL={activeSceneCompositeSrc}
            orientation={this.props.screen.orientation}
            portraitOffset={portraitOffset}
            landscapeRepeat={landscapeRepeat}
            isBlitzing={this.props.blitz}
            onEditClick={this.props.actions.loadFaceAndEdit}
            onShareClick={this.props.actions.startShare} />
          <ReactCSSTransitionGroup component={FirstChild}
            transitionName="pop"
            transitionEnterTimeout={350}
            transitionLeaveTimeout={350}>
          { this.props.editor.open && (
            <Editor
              key="editor"
              faceSrcURL={this.props.editor.faceDataURL}
              onConfirmClick={this.props.actions.mergeFace}
              onCancelClick={this.props.actions.cancelFaceEditor} />
          )}
          { this.props.share && (
            <Share
              key="share"
              srcURL={activeSceneSrc}
              compositeURL={activeSceneCompositeSrc}
              onCloseClick={this.props.actions.completeShare} />
          )}
          </ReactCSSTransitionGroup>

        </article>
      </div>
    );

  }
}

const mapStateToProps = (state) => {

  const {blitz} = state;

  return {
    ...state,
    blitz: isBlitzing(blitz),
    activeScene: getBlitzedScene(state)
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
