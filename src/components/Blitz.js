import React from 'react';

const Blitz = (props) => {
  return (
    <section className="layer layer--blitz">
      <div className="layer__body blitz">
        <div onClick={props.onBlitzToggle} className="blitz__matte">
          <img alt="corndog" className="blitz__img" src={props.srcURL} />
        </div>
        <div className="blitz__info xs-p3">
          <p className="blitz__info-message xs-m0">
            Tap to { props.isBlitzing ? "stop blitz" : "start blitz" }
          </p>
        </div>
        <div className="blitz__controls xs-p3">
          <a onClick={props.onFaceClick} className="button button--secondary xs-m0">Add a face</a>
          <a onClick={props.onShareClick} className="button button--primary xs-m0">Share</a>
        </div>
      </div>
    </section>
  )
}

Blitz.propTypes = {
  onBlitzToggle: React.PropTypes.func,
  onFaceClick: React.PropTypes.func,
  onShareClick: React.PropTypes.func,
  srcURL: React.PropTypes.string,
  isBlitzing: React.PropTypes.bool
}

export default Blitz;
