import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

class AudioPlayer extends Component {

  static propTypes = {
    progress: React.PropTypes.number,
    autoPlay: React.PropTypes.bool,
    onMeta: React.PropTypes.func,
    onEnded: React.PropTypes.func,
    onListen: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onPlay: React.PropTypes.func,
    onCanPlay: React.PropTypes.func,
    preload: React.PropTypes.string,
    src: React.PropTypes.string
  };

  refPlayer = (player) => {
    this.player = player;
    this.player.loop = true;
  }

  onListen = (currentTime) => {
    this.props.onListen(currentTime, this.player.audioEl.duration);
  }

  onEnded = (e) => {
    this.player.audioEl.currentTime = 0;
    this.player.audioEl.play();
    this.player.audioEl.pause();
    this.player.audioEl.play();
    this.props.onEnded(e);
  }

  componentDidUpdate(prevProps) {
    // only update playback if the command has changed
    if (prevProps.command !== this.props.command) {
      switch(this.props.command) {
        case 'play':
          this.player.audioEl.play();
          break;
        case 'pause':
          this.player.audioEl.pause();
          break;
        default:
          return;
      }
    }
  }

  render() {
    const progress = (this.props.progress) ? this.props.progress : 0;

    return (
      <div className="audio-player">
        <span className="audio-player__progress" style={{width:(progress*100+"%")}}></span>
        <ReactAudioPlayer
          ref={this.refPlayer}
          listenInterval={100}
          src={this.props.src}
          onCanPlay={this.props.onCanPlay}
          autoPlay={this.props.autoPlay}
          className="audio-player__audio"
          onEnded={this.onEnded}
          onListen={this.onListen}
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          preload={this.props.preload}
          controls={false}
        />
      </div>
    );

  }
}


export default AudioPlayer;
