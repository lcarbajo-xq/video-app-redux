import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from '../components/video';
import Title from '../components/title';
import PlayPause from '../components/play-or-pause';
import Timer from '../components/timer.js';
import Controls from '../components/video-player-controls.js';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/fullscreen';
import { connect } from 'react-redux';

class VideoPlayer extends Component {
  state = {
    pause: true,
    duration: 0,
    currentVideoTime: 0,
    loading: false,
  }
  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause
    })
  }
  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }
  handleLoadedMetadata = event => {
    this.video = event.target;
    this.setState({
      duration: this.video.duration
    });
  }
  handleTimeUpdate = event => {
    // console.log(this.video.currentTime)
    this.setState({
      currentVideoTime: this.video.currentTime
    })
  }
  handleProgressChange = event => {
    // event.target.value
    this.video.currentTime = event.target.value
  }
  handleSeeking = event => {
    this.setState({
      loading: true
    })
  }
  handleSeeked = event => {
    this.setState({
      loading: false
    })
  }
  handleVolumeChange = event => {
    if (this.video.muted){
      this.video.muted = !this.video.muted;
    }
    this.video.volume = event.target.value;
  }
  handleVolumeClick = (event) => {
      this.video.muted = !this.video.muted;
  }
  setRef = element => {
    this.player = element
  }
  render(){
    return(
        <VideoPlayerLayout
          setRef={this.setRef}>
          <Title
            title={this.props.media.get('title')}/>
          <Controls>
            <PlayPause
              pause={this.state.pause}
              handleClick={this.togglePlay}/>
            <Timer
              currentVideoTime={this.state.currentVideoTime}
              duration={this.state.duration}
              />
            <ProgressBar
              duration={this.state.duration}
              value={this.state.currentVideoTime}
              handleProgressChange={this.handleProgressChange}/>
            <Volume
              volumeValue={this.state.volumeValue}
              handleVolumeChange={this.handleVolumeChange}
              handleVolumeClick={this.handleVolumeClick}/>
            <FullScreen
              handleFullScreenClick={this.handleFullScreenClick}/>
            </Controls>
            <Spinner
              active={this.state.loading}/>
            <Video
              autoPlay={this.props.autoPlay}
              pause={this.state.pause}
              handleLoadedMetadata={this.handleLoadedMetadata}
              handleTimeUpdate={this.handleTimeUpdate}
              handleSeeking={this.handleSeeking}
              handleSeeked={this.handleSeeked}
              src={this.props.media.get('src')}
              />
        </VideoPlayerLayout>
        )
    }
}
function mapStateToProps (state, props) {
  return {
    media: state.get('data').get('entities').get('media').get(props.id)
  }
}

export default connect (mapStateToProps)(VideoPlayer);
