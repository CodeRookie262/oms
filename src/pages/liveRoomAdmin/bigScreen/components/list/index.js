import React, { Component } from "react";
// import Link from "umi/link";
// import router from "umi/router";
import { Row, Col, Tooltip } from "antd";
import { connect } from "dva";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from "video-react";
// import Iconfont from "@/components/Iconfont";
import defaultImg from "../../../../../assets/default.png";
import styles from "./index.less";

@connect(({}) => ({}))
class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentBigSreenList } = this.props;
    console.log("currentBigSreenList==============", currentBigSreenList);
    return (
      <div className={styles.panel}>
        <Row type="flex">
          {currentBigSreenList &&
            currentBigSreenList.length > 0 &&
            currentBigSreenList.map((item, index) => (
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
                    <Player
                      muted
                      autoPlay
                      // height={`100%`}
                      // width="100%"
                      // fluid={false}
                      playsInline={true}
                      className={styles.vedio}
                      poster={
                        (item.room_poster && item.room_poster) || defaultImg
                      } // 视频封面
                    >
                      <source
                        src={`http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`}
                      />
                      <ControlBar style={{ display: "none" }}>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton
                          rates={[5, 2, 1, 0.5, 0.1]}
                          order={7.1}
                        />
                        <VolumeMenuButton disabled />
                      </ControlBar>
                    </Player>
                  </div>
                </Col>
              </Tooltip>
            ))}
        </Row>
      </div>
    );
  }
}

export default HelpList;
