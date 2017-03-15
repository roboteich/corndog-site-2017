import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Share = (props) => {

  const isSrc = !(props.compositeURL);
  const dataURL = (isSrc) ? props.srcURL : props.compositeURL;

  return (
    <section className="layer layer--share xs-z1">
      <div className="layer__body share">
        <div className="share__preview xs-pt2 md-pt3 lg-pt4">
          <img className="share__preview-img" src={dataURL} alt="corndog"/>
        </div>
        <h2 className="share__heading">
          Share your masterpiece
        </h2>
        <div className="share__actions">
          <a className="button button--block button--twitter">Twitter</a>
          <a className="button button--block button--facebook">Facebook</a>
          <a href={dataURL} target="_blank" className="button button--block button--secondary">Save Image</a>
        </div>
        <div className="share__controls">
          <a href="#" onClick={cancelEventAndRun(props.onCloseClick)} className="button button--round button--secondary button--circle button--close">close</a>
        </div>
      </div>
    </section>
  )
}

Share.propTypes = {
  onCloseClick: React.PropTypes.func,
  srcURL: React.PropTypes.string,
  compositeURL: React.PropTypes.string
}

export default Share;
