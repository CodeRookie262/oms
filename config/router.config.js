export default [
  {
    path: "/",
    component: "../layouts/BlankLayout",
    routes: [
      {
        path: "/user",
        component: "../layouts/userLayout",
        authority: ["guest"],
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./User/Login"
          },
          {
            name: "register",
            path: "/user/register",
            component: "./User/Register"
          },
          {
            component: "404"
          }
        ]
      },
      {
        path: "/forget",
        component: "../layouts/forgetLayout",
        authority: ["guest"],
        routes: [
          {
            name: "index",
            path: "/forget/index",
            component: "./user/forget"
          },
          {
            name: "complaint",
            path: "/forget/complaint",
            component: "./user/forget/onComplaint"
          },
          {
            name: "phone",
            path: "/forget/phone",
            component: "./user/forget/onPhone"
          },
          {
            name: "email",
            path: "/forget/email",
            component: "./user/forget/onEmail"
          },
          {
            name: "reset",
            path: "/forget/resetSuccess",
            component: "./user/forget/resetSuccess"
          }
        ]
      },
      {
        path: "/",
        component: "../layouts/BasicLayout",
        Routes: ["src/pages/Authorized"],
        authority: ["user"],
        routes: [
          // { path: "/", redirect: "/releaseCenter/help" },
          {
            name: "release-center",
            icon: "video-camera",
            path: "/releaseCenter",
            routes: [
              {
                name: "help",
                path: "/releaseCenter/help",
                component: "./releaseCenter/helpCenter"
              }
            ]
          },
          {
            name: "live-room-admin",
            icon: "video-camera",
            path: "/liveRoomAdmin",
            routes: [
              {
                name: "bigScreen",
                path: "/liveRoomAdmin/bigScreen",
                component: "./liveRoomAdmin/bigScreen"
              }
            ]
          },
          { component: "404" }
        ]
      }
    ]
  }
];
