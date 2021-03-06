const MenuIcon = ({
  imgStyle,
  imgSrc
}) => ( <
  Icon component = {
    () => ( <
      img style = {
        {
          width: '1em',
          height: '1em',
          ...imgStyle
        }
      }
      src = {
        `${imgSrc}`
      }
      alt = "icon" /
      >
    )
  }
  />
);
export default [{
  path: '/',
  component: '../layouts/BlankLayout',
  routes: [{
      path: '/user',
      component: '../layouts/userLayout',
      authority: ['guest'],
      routes: [{
          name: 'login',
          path: '/user/login',
          component: './User/Login'
        },
        {
          name: 'register',
          path: '/user/register',
          component: './User/Register'
        },
        {
          component: '404'
        }
      ]
    },
    {
      path: '/forget',
      component: '../layouts/forgetLayout',
      authority: ['guest'],
      routes: [{
          name: 'index',
          path: '/forget/index',
          component: './user/forget'
        },
        {
          name: 'complaint',
          path: '/forget/complaint',
          component: './user/forget/onComplaint'
        },
        {
          name: 'phone',
          path: '/forget/phone',
          component: './user/forget/onPhone'
        },
        {
          name: 'email',
          path: '/forget/email',
          component: './user/forget/onEmail'
        },
        {
          name: 'reset',
          path: '/forget/resetSuccess',
          component: './user/forget/resetSuccess'
        }
      ]
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['user'],
      routes: [{
          path: '/',
          redirect: '/releaseCenter/help'
        },
        //帮助
        {
          name: 'release-center',
          icon: 'question-circle',
          path: '/releaseCenter/help',
          routes: [{
            name: 'help',
            path: '/releaseCenter/help',
            component: './releaseCenter/helpCenter'
          }]
        },
        //组织管理
        {
          name: 'organizational-management',
          icon: 'question-circle',
          path: '/organizationalManagement',
          routes: [{
              name: 'organizational-list',
              path: '/organizationalManagement/list',
              component: './organizationalManagement/organizational'
            },
            {
              name: 'organizational-create',
              path: '/organizationalManagement/create',
              component: './organizationalManagement/createOrganization',
              hideInMenu: true
            }
          ]
        },
        //系统设置
        {
          name: 'system-setting',
          icon: 'question-circle',
          path: '/systemSetting',
          routes: [{
              name: 'discount-time',
              path: '/systemSetting/discountTime',
              component: './systemSetting/discountTime'
            },
            {
              name: 'live-parameter',
              path: '/systemSetting/liveParameter',
              component: './systemSetting/liveParameter',
              routes: [{
                path: '/systemSetting/liveParameter/Preview',
                component: './systemSetting/liveParameter/components/Preview'
              }, {
                path: '/systemSetting/liveParameter/createEdit',
                component: './systemSetting/liveParameter/components/createEdit'
              }]
            }
          ]
        },
        {
          name: 'complaint-advice',
          icon: 'question-circle',
          path: '/complaintAdvice/complaint',
          routes: [{
              name: 'complaint-list',
              path: '/complaintAdvice/complaint',
              component: './complaintAdvice/complaint'
            },


          ]
        },
        //直播大屏
        {
          name: 'live-room-admin',
          icon: 'video-camera',

          path: '/liveRoomAdmin/bigScreen',
          routes: [{
            name: 'bigScreen',
            path: '/liveRoomAdmin/bigScreen',
            component: './liveRoomAdmin/bigScreen'
          }]
        },
        //系统日志
        {
          name: 'system-journal',
          icon: 'question-circle',
          path: '/systemJournal',
          routes: [{
              name: 'operation-journal',
              path: '/systemJournal/operationJournal',
              component: './systemJournal/operationJournal'
            },
            {
              name: 'event-detail',
              path: '/systemJournal/eventDetail/:id',
              component: './systemJournal/eventDetail',
              hideInMenu: true
            }
          ]
        },
        //套餐管理
        {
          name: 'financial-management',
          icon: 'question-circle',
          path: '/financialManagement',
          routes: [{
              name: 'financial-list',
              path: '/financialManagement/list',
              component: './financialManagement/financial'
            },
            {
              name: 'financial-create',
              path: '/financialManagement/create/',
              component: './financialManagement/createFinancial'
            },
            {
              name: 'financial-edit',
              path: '/financialManagement/edit/:id',
              component: './financialManagement/editFinancial',
              hideInMenu: true
            },
            {
              name: 'financial-detail',
              path: '/financialManagement/detail/:id',
              component: './financialManagement/detailFinancial',
              hideInMenu: true
            }
          ]
        },

        {
          component: '404'
        }
      ]
    }
  ]
}];