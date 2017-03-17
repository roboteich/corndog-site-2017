import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Blitz = (props) => {

  const isLandscape = ('landscape' === props.orientation.toLowerCase());

  const activeSrc = !(props.activeScene.compositeDataURL);

  const sceneLayers = props.scenes.map((scene) => {
    const isSrc = !(scene.compositeDataURL);
    const matteImageURL = (isSrc) ? scene.srcDataURL : scene.compositeDataURL;
    const backgroundImage = "url('" + matteImageURL + "')";
    let backgroundPosition = (!isLandscape) ? scene.portraitOffset : null;
    let backgroundRepeat = 'no-repeat';
    let backgroundSize = 'cover';
    let matteClassName = 'blitz__scene';

    if(scene.srcURL === props.activeScene.srcURL) {
      matteClassName += ' active';
      // if(!isLandscape && !props.isBlitzing) {
      //   matteClassName += ' blitz__matte--pan';
      // }
    }

    if (isLandscape && scene.landscapeRepeat) {
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
      <div
        key={scene.srcURL}
        className={matteClassName}
        style={matteStyle}
      />
    )

  });

  return (
    <section className="layer layer--blitz xs-z1">
      <div className="layer__body blitz xs-relative">
        <div className="blitz__matte"
        onClick={props.onBlitzToggle}>
          {sceneLayers}
        </div>
        <p className={"blitz__info blitz__info--pulse"}>
            TAP TO { props.isBlitzing ? "STOP" : "START" }
        </p>
        <div className="blitz__controls xs-absolute xs-b3 xs-full-width xs-pr3 xs-pl3 xs-clearfix">
          <a href="#" onClick={cancelEventAndRun(props.onEditClick)} className="blitz__edit button button--primary button--block xs-float-left">
          { !activeSrc ? "Change Face" : "Add Your Face" }
          </a>
          <a href="#" onClick={cancelEventAndRun(props.onShareClick)} className="blitz__share button button--primary button--block xs-float-right">Share</a>
        </div>
      </div>
    </section>
  )
}

Blitz.propTypes = {
  onBlitzToggle: React.PropTypes.func,
  onFaceClick: React.PropTypes.func,
  onShareClick: React.PropTypes.func,
  scenes: React.PropTypes.array,
  activeScene: React.PropTypes.object,
  isBlitzing: React.PropTypes.bool
}

export default Blitz;
