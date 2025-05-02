import { THROTTLE_TIME } from '@const';

export const throttle = (fn, ms = THROTTLE_TIME) => {
  var flag = false;
  var self;
  var last;

  return function (...args) {
    if (flag) {
      self = this;
      last = args;
      return;
    }

    fn.apply(this, args);

    flag = true;

    setTimeout(() => {
      flag = false;

      if (last) {
        fn.apply(self, last);
        self = null;
        last = null;
      }
    }, ms);
  };
};
