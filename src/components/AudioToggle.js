import React from 'react';
import {cancelEventAndRun} from '../lib/eventHelpers';

const AudioToggle = (props) => {

  const toggleMod = (props.playing) ? 'pause' : 'play';

  return(
    <a
      className={'button button--circle button--secondary audio-toggle audio-toggle--' + toggleMod}
      onClick={cancelEventAndRun(props.onToggle)}
    >
      toggle audio
    </a>);

}

AudioToggle.propTypes = {
  playing:React.PropTypes.bool,
  onToggle:React.PropTypes.func
};

export default AudioToggle;
