import { DEBOUNCE_TIME } from '@const';

export const debounce = (fn, ms = DEBOUNCE_TIME) => {
  var timer;

  return function (...args) {
    const callback = () => {
      fn.apply(this, args);
    };

    clearTimeout(timer);

    timer = setTimeout(callback, ms);
  };
};
