import React from 'react';
import CorndogTitle from '../../assets/images/site-title.png';

const Splash = (props) => {

  return (
    <section className="layer layer--splash">
      <div className="layer__body splash xs-p3 lg-p6">
        <h1 className="splash__heading xs-text-3 heavy xs-m0 xs-mb2 lg-mb6">NCD 2017</h1>
        <div className="splash__hero xs-mb2 lg-mb6">
          <img alt="corndog"className="splash__hero-image" src={CorndogTitle} />
        </div>
        <a href="#" onClick={props.onStartClick} className="splash__start-btn button button--large button--primary">
          Put your mug on a dog
        </a>
      </div>
    </section>
  );
}

Splash.propTypes = {
  onStartClick: React.PropTypes.func.isRequired
}

export default Splash;
