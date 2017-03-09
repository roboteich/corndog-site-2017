import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getBlitzedScene } from '../../reducers';
import { isBlitzing } from '../../reducers/blitz';
import Splash from '../../components/Splash';

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
  }



  render() {
    //render load progress, readyState
    const activeSceneSrc = (this.props.activeScene) ? this.props.activeScene.srcDataURL : "";

    return(
      <div className="site-container xs-full-height xs-fit">
        <header className="site-header">
        </header>
        <article className="site-content">
          { !this.props.ready && (
            <Splash onStartClick={this.handleSplashStartClick} />
          )}
          <section className="layer layer--blitz">
            <div className="layer__body blitz" onClick={this.handleBlitzToggle}>
              <img alt="corndog" className="blitz__img" src={activeSceneSrc} />
              <div className="blitz__info button button--primary">
                { this.props.blitz ? "stop blitz" : "start blitz" }
              </div>
            </div>
          </section>
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
