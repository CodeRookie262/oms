const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        collapsed: true
      },
      { payload }
    ) {
      return { ...state, collapsed: payload };
    }
  },
  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    }
  }
};
export default GlobalModel;
