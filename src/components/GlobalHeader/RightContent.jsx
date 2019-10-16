import { Icon, Tooltip } from "antd";
import React from "react";
import { connect } from "dva";
import { formatMessage } from "umi-plugin-react/locale";
import Avatar from "./AvatarDropdown";
import SelectLang from "../SelectLang";
import styles from "./index.less";
import IconFont from "../Iconfont";

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === "dark" && layout === "topmenu") {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <span className={styles.help}>
        <IconFont
          type="doubt"
          style={{
            fontSize: "1.4em",
            verticalAlign: "-0.25em",
            marginRight: "3px"
          }}
        ></IconFont>
        帮助
      </span>
      <SelectLang className={styles.action} />
      {/* <Avatar /> */}
      <Avatar menu />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout
}))(GlobalHeaderRight);
