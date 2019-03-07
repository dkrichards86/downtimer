export const AlertChime = {
  install: (Vue) => {
    Vue.alert_chime = {
      play: () => {}
    };
    Vue.prototype.$alert_chime = {
      play: () => {}
    };
  }
};

export const NativeNotification = {
  install: (Vue) => {
    Vue.native_notification = {
      notify: () => {},
      hasDefaultPermission: () => false
    };
    Vue.prototype.$native_notification = {
      notify: () => {},
      hasDefaultPermission: () => false
    };
  }
};
