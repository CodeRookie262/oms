import React, { Component } from "react";
import Link from "umi/link";
import router from "umi/router";
import { Row, Col, Tooltip } from "antd";
import { connect } from "dva";
import Iconfont from "@/components/Iconfont";
import defaultImg from "../../../../../assets/default.png";
import testVedio1 from "../../../../../assets/testVedio-1.mp4";
import styles from "./index.less";

const dataSource = [
  {
    url:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573536957289&di=9e7713ab30757a4eae3cdca2d22b51d3&imgtype=0&src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2FTB2u2ADaHH8F1JjSspoXXXWYXXa_%2521%2521412124966.jpg_400x400.jpg"
  }
];

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
                    <video
                      src={testVedio1}
                      poster={
                        (item.room_poster && item.room_poster) || defaultImg
                      } // 视频封面
                      // controls="controls"
                      className={styles.vedio}
                      preload="auto"
                      autoplay="autoplay"
                      muted
                      loop="loop"
                    >
                      您的浏览器不支持 video 标签。
                    </video>
                    {/* <img src={item.room_poster} /> */}
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
