import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getBlitzedScene } from '../../reducers';
import { isBlitzing } from '../../reducers/blitz';

class Root extends Component {

  static propTypes = {
    scenes: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  handleBlitzClick = (e) => {
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
      <div className="site-container fit">
        <header className="site-header">
        </header>
        <article className="site-content">
          { !this.props.ready && (
          <section className="layer layer--splash">
            <div className="layer__body splash">
              <div className="splash__heading">
                <h1>Corndog day 2017</h1>
              </div>
              <a href="#" onClick={this.handleBlitzClick} className="splash__start-btn button button--primary">
                blitz!
              </a>
            </div>
          </section>
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
        <footer className="site-footer">
        </footer>
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
