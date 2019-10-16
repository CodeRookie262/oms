/* 
  // 上传文件到阿里云服务器，获取上传后的fid
  import uploadFile from '@/utils/upload';
  uploadFile(file)
    .then(res => {})
    .catch(res => {})
*/

import { message } from "antd";

const config = {
  policyUrl: "https://bss.eliteu.cn/aliyun_oss/get_upload_policy",
  imageUrl: "https://bss.eliteu.cn/oss_media/",
  // system: "support",
  system: "elitelive",
  user: "xavier"
};

// 获取阿里云oss上传策略
// signature过期时间为1-2分钟，暂不缓存signature
function getSignature() {
  return new Promise((resolve, reject) => {
    let xhr = {};
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      xhr = null;
    }

    let fd = new FormData();
    fd.append("mode", "dev");
    fd.append("system", config.system);
    fd.append("user", config.user);
    xhr.open("POST", config.policyUrl, false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.send(fd);
  });
}
/**
 * 生成任意长度随机字符串
 * 包含数字、大写字母、小写字母
 * len: 字符串长度
 * 注意：用到了上面的随机数方法
 */
const randomStr = (len = 9) => {
  let str = "";
  let list = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i++) {
    let index = randomNum(0, 35);
    let word = list[index];
    if (isNaN(word) && randomNum() < 50) {
      word = word.toUpperCase();
    }
    str += word;
  }
  return str;
};

// 构建formdata上传文件，获取fid
export default function uploadFile(file) {
  return getSignature().then(response => {
    return new Promise((resolve, reject) => {
      let xhr = {};
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } else {
        xhr = null;
      }

      let fd = new FormData();
      // console.log(fd);
      const res = JSON.parse(response).data;
      let date = new Date();
      let date_j = date.setMinutes(
        date.getMinutes() - date.getTimezoneOffset()
      ); // toJSON 的时区补偿
      // debugger;
      // let date_f = date_j
      //   .toJSON()
      //   .substr(0, 13)
      //   .replace(/[-T]/g, "");
      let key =
        res.dir +
        "elitelive/" +
        date_j +
        // "/" +
        // this.randomStr(9) +
        "/" +
        file.name;

      fd.append("OSSAccessKeyId", res.accessid);
      fd.append("policy", res.policy);
      fd.append("Signature", res.signature);
      fd.append("success_action_status", "200");
      // fd.append("key", res.dir);
      fd.append("key", key);
      fd.append("callback", res.callback);
      fd.append("x:originname", file.name);
      fd.append("file", file);

      xhr.open("POST", res.host);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          let date = new Date();
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // toJSON 的时区补偿
          date
            .toJSON()
            .substr(0, 13)
            .replace(/[-T]/g, "");
          // const { fid } = JSON.parse(xhr.responseText).data;
          const res = JSON.parse(xhr.responseText);
          res.host = config.imageUrl;
          resolve(res);
          // resolve({
          //   fid: res.data,
          //   // url: config.imageUrl + fid
          // });
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.send(fd);
    });
  });
}

// 上传前限制文件后缀，文件大小，图片尺寸
// 获取图片base64编码，实现图片预览
export function getBase64(file) {
  const reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result); // base64图片
  };
  reader.readAsDataURL(file);
}

// 限制图片类型
export function limitFileType(file) {
  const fileType = [".jpg", ".png", ".gif", ".bmp"];
  const type = file.type.substr(file.type.lastIndexOf("."));
  if (fileType.indexOf(type) === -1) {
    message.error("请上传.jpg, .png, .gif, .bmp格式的文件");
  }
}

// 限制图片大小
export function limitFileSize(file) {
  const isLt2M = file.size / 1024 / 1024 > 2;
  if (isLt2M) {
    message.error("Image must smaller than 2MB!");
    return false;
  }
}

// 限制图片尺寸
export function limitPicWidth(file) {
  let reader = new FileReader();
  reader.onload = () => {
    // 检查图片尺寸
    var image = new Image();
    image.onload = () => {
      let width = image.width;
      let height = image.height;
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}
