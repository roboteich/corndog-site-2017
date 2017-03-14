import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Blitz = (props) => {


  console.log('render blitz');

  const isSrc = !(props.compositeURL);
  const matteImageURL = (isSrc) ? props.srcURL : props.compositeURL; 
  const matteStyle = {
    backgroundImage: "url('" + matteImageURL + "')"
  }

  return (
    <section className="layer layer--blitz xs-z1">
      <div className="layer__body blitz xs-relative">
        <div
          onClick={props.onBlitzToggle}
          className="blitz__matte xs-absolute"
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
  isBlitzing: React.PropTypes.bool
}

export default Blitz;
