import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Blitz = (props) => {

  const isLandscape = ('landscape' === props.orientation.toLowerCase());
  const isSrc = !(props.compositeURL);
  const matteImageURL = (isSrc) ? props.srcURL : props.compositeURL;
  const backgroundImage = "url('" + matteImageURL + "')";
  let backgroundPosition = (!isLandscape) ? props.portraitOffset : null;
  let backgroundRepeat = 'no-repeat';
  let backgroundSize = 'cover';
  let matteClassName = 'blitz__matte';

  // if(!isLandscape && !props.isBlitzing) {
  //   matteClassName += ' blitz__matte--pan';
  // }

  console.log('blitz render', isLandscape, props.isBlitzing, matteClassName);

  if (isLandscape && props.landscapeRepeat) {
    backgroundSize = 'contain';
    backgroundRepeat = 'repeat-x';
    backgroundPosition = '0% top';
  }


  const matteStyle = {
    backgroundImage,
    backgroundPosition,
    backgroundRepeat,
    backgroundSize
  }

  return (
    <section className="layer layer--blitz xs-z1">
      <div className="layer__body blitz xs-relative">
        <div
          onClick={props.onBlitzToggle}
          className={matteClassName}
          style={matteStyle}
        />
        <p className="blitz__info xs-absolute xs-t3 xs-l3">
            Tap to { props.isBlitzing ? "Stop" : "Start" }
        </p>
        { !props.isBlitzing && (
          <div className="blitz__controls xs-absolute xs-b3 xs-full-width xs-pr3 xs-pl3 xs-clearfix">
            <a href="#" onClick={cancelEventAndRun(props.onEditClick)} className="blitz__edit button button--secondary button--block xs-float-left">
            { !isSrc ? "Change Face" : "Add Your Face" }
            </a>
            <a href="#" onClick={cancelEventAndRun(props.onShareClick)} className="blitz__share button button--primary button--block xs-float-right">Share</a>
          </div>
        )}
      </div>
    </section>
  )
}

Blitz.propTypes = {
  onBlitzToggle: React.PropTypes.func,
  onFaceClick: React.PropTypes.func,
  onShareClick: React.PropTypes.func,
  srcURL: React.PropTypes.string,
  compositeURL: React.PropTypes.string,
  isBlitzing: React.PropTypes.bool,
  landscapeRepeat: React.PropTypes.bool,
  portraitOffset: React.PropTypes.string
}

export default Blitz;
