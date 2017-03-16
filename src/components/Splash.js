import React from 'react';
import CorndogTitle from '../assets/images/site-title-graphic.png';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Splash = (props) => {

  return (
    <section className="layer layer--splash">
      <div className="layer__body splash xs-p3 lg-p6">
        <h1 className="splash__heading xs-text-3 heavy">NATIONAL <span className="no-wrap">CORNDOG DAY</span></h1>
        <div className="splash__hero">
          <div className="splash__hero-inner">
            <img alt="corndog" className="splash__hero-image" src={CorndogTitle} />
          </div>
        </div>
        <a href="#" onClick={cancelEventAndRun(props.onStartClick)} className="splash__start-btn button button--large button--primary button--block">
          Put your mug <span className="no-wrap">on a dog</span>
        </a>
      </div>
    </section>
  );
}

Splash.propTypes = {
  onStartClick: React.PropTypes.func.isRequired
}

export default Splash;
