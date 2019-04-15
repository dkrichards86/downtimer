import Push from 'push.js';

const notify = (title, opts) => Push.create(title, opts);

const hasDefaultPermission = () => Push.Permission.get() === Push.Permission.DEFAULT;

const NativeNotification = {
  install: (Vue) => {
    Vue.native_notification = { notify, hasDefaultPermission };
    Vue.prototype.$native_notification = { notify, hasDefaultPermission };
  },
};


export default NativeNotification;
