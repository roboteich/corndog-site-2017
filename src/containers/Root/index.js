import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getSceneCount } from '../../reducers/scenes';
import { isBlitzing } from '../../reducers/blitz';
import {spring, Motion} from 'react-motion';

class Root extends Component {

  static propTypes = {
    loadProgress: React.PropTypes.number.isRequired,
    scenes: React.PropTypes.array.isRequired,
    ready: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      preloadSequenceComplete: false
    }
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

  handlePreloadRest = () => {
    if(this.props.loadProgress === 1){
      this.setState({preloadSequenceComplete:true});
    }
  }

  componentDidMount() {
    //kickoff image load
    this.props.actions.preload();
  }



  render() {
    //render load progress, readyState


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
              {
                this.state.preloadSequenceComplete ? (
                  <a href="#" onClick={this.handleBlitzClick} className="splash__start-btn button button--primary">
                    blitz!
                  </a>
                ) : (
                  <div className="splash__loader progress">
                    <div className="progress__track">
                      <Motion
                        onRest={this.handlePreloadRest}
                        defaultStyle={{width: 0}}
                        style={{
                          width:spring(this.props.loadProgress * 100)
                        }}>
                          {({width}) =>
                            <div className="progress__fill"
                              style={{width: width+"%"}}
                            />
                          }
                          </Motion>
                      </div>
                    </div>
                  )}
              </div>
            </section>
          )}
          <section className="layer layer--blitz">
            <div className="layer__body blitz" onClick={this.handleBlitzToggle}>
              <img alt="corndog" className="blitz__img" src={this.props.blitzSrcDataURL} />
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

  const {preload, scenes, blitz} = state;

  return {
    ...state,
    loadProgress: (preload / getSceneCount(scenes)),
    blitz: isBlitzing(blitz),
    blitzSrcDataURL: state.scenes[state.activeSceneIndex].srcDataURL
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
