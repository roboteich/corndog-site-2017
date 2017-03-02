import React from 'react';
import './index.scss';

const Splash = (props) => {

  const onClickStart = (e) => {
    e.preventDefault();
    this.props.onClickStart();
  }

  return (
    <div className="size-fit splash">
      <div className="splash__blurb">
      </div>
      <div className="splash__preloader preloader">
        <div className="preloader__outline">
          <div className="preloader__text">
            {this.props.loadProgress}
          </div>
        </div>
      </div>
      { this.props.ready &&
        <div className="splash__start-button button">
          <a href="#" onClick={onClickStart}>Start</a>
        </div>
      }
    </div>
  );
}

Splash.propTypes = {
  loadProgress: React.PropTypes.number.isRequired,
  ready: React.PropTypes.bool.isRequired,
  onClickStart: React.PropTypes.func.isRequired
}

export default Splash;
