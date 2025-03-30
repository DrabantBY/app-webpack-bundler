export const debounce = (fn, ms) => {
  let timer;

  return function (...args) {
    const callback = () => {
      fn.apply(this, args);
    };

    clearTimeout(timer);

    timer = setTimeout(callback, ms);
  };
};
