import React from 'react';
import styles from './forgetLayout.less';

const ForgetLayout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.con_top}>{children}</div>
    <div className={styles.con_footer}>Copyright © 2018-2019 广东英荔国际教育科技有限公司  粤ICP备13044168号-7 增值电信业务经营许可证：B2-20191904</div>
  </div>
);

export default ForgetLayout;