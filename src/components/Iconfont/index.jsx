import React, { PureComponent } from "react";
require("@/libs/iconfont");

export default function IconFont(props) {
  return (
    <svg 
      {...props}
      className={`iconfont ${props.className}`}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${props.type}`} />
    </svg>
  );
}