import React, { Component } from 'react';
// import Link from "umi/link";
// import router from "umi/router";
import { Row, Col, Tooltip, Empty } from 'antd';
import { connect } from 'dva';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';
import Hls from 'hls.js';
import VideoPlayer from './VideoPlayer';
// import Iconfont from "@/components/Iconfont";
import defaultImg from '../../../../../assets/default.png';
import styles from './index.less';

@connect(({}) => ({}))
class LiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  hlsVideo = (item, index) => {
    let url = '';
    const reg = 'http://beta.yingliboke.cn';
    url =
      process.env.NODE_ENV === 'development'
        ? item.download_url.replace(reg, '/video')
        : item.download_url;
    var hls = new Hls();
    console.log('url', url);
    hls.loadSource(
      '/video/miniapp/zegotest-803858156-live_stram_idw6TqC/playlist.m3u8'
    );
    hls.attachMedia(this.refs[`videoRef-${index}`]);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      this.$refs.videoRef.play();
    });
  };
  componentDidUpdate() {
    const { currentBigSreenList } = this.props;
    currentBigSreenList.length > 0 &&
      currentBigSreenList.map((item, index) => {
        this.hlsVideo(item, index);
      });
  }
  render() {
    const { currentBigSreenList } = this.props;
    console.log('currentBigSreenList==============', currentBigSreenList);

    return (
      <div className={styles.panel}>
        <Row type="flex">
          {currentBigSreenList.count > 0 ? (
            currentBigSreenList.results.map((item, index) => (
              <Tooltip key={index} title={item.room_title && item.room_title}>
                <Col
                  key={index}
                  className={styles.listBox}
                  span={6}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={10}
                >
                  <div className={styles.imgPanel}>
                    <VideoPlayer id={item.id} rtmp_url={item.rtmp_url} />
                  </div>
                </Col>
              </Tooltip>
            ))
          ) : (
            <Empty className={styles.empty} />
          )}
        </Row>
      </div>
    );
  }
}

export default LiveList;
