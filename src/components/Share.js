import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const Share = (props) => {

  const isSrc = !(props.compositeDataURL);
  const dataURL = (isSrc) ? props.srcURL : props.compositeDataURL;
  const fbAppId = 254740324978219;
  const imgLinkURL = props.compositeURL;

  const fbLink = 'https://www.facebook.com/dialog/feed' +
    '?app_id=' + fbAppId +
    '&redirect_uri=https://www.corndog.love' +
    '&link=https://www.corndog.love' +
    '&picture=' + imgLinkURL +
    '&caption=National%20Corndog%20Day%20' +
    '&description=Show%20your%20love%20and%20put%20your%20face%20on%20a%20corndog%20for%20%23NationalCorndogDay';

  const twLink = 'https://twitter.com/intent/tweet' +
    '?text=' + encodeURIComponent(props.compositePageURL) + '+%E2%80%94+Show+your+love+at+http%3A%2F%2Fwww.corndog.love+and+put+your+face+on+a+dog+for+%23NationalCorndogDay';

  const pending = !(isSrc || imgLinkURL);

  return (
    <section className="layer layer--share xs-z3">
      <div className="layer__body share">
        <div className="share__preview xs-pt2 md-pt3 lg-pt4" style={{backgroundImage:'url("'+ dataURL + '")'}}>
        </div>
        <h2 className="share__heading">
          Share your masterpiece
        </h2>
        <div className={"share__actions" + ((pending) ? " share__actions--pending" : "" )}>
          {pending &&
            <div className="share__message text-2">Saving...</div>
          }
          <a href={fbLink} target="_blank" className="button button--block button--facebook">Facebook</a>
          <a href={twLink} target="_blank" className="button button--block button--twitter">Twitter</a>
          <a href={dataURL} target="_blank" className="button button--block button--secondary">Download</a>
        </div>
        <div className="share__controls">
          <a href="#" onClick={cancelEventAndRun(props.onCloseClick)} className="button button--secondary button--circle button--close">close</a>
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
