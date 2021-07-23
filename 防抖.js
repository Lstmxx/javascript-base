// 此时this的指向会是window

function debounceV1(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

// 此时this指向为调用函数的主体，但是未能获取传参

function debounceV2(func, wait) {
  let timeout;
  return function() {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context)
    }, wait);
  };
};

// 获取arguments参数并通过apply传入

function debounceV3(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait);
  };
};

// 增加立刻执行flag

function debounceV4(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callnow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callnow) func.apply(context, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait);
    };

  };
};

// 增加返回值

function debounceV5(func, wait, immediate) {
  let timeout, result;
  return function() {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callnow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callnow) result = func.apply(context, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait);
    };

    return result;

  };
};

// 增加取消功能

function debounceV6(func, wait, immediate) {
  let timeout, result;
  function debounced() {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callnow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callnow) result = func.apply(context, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait);
    };

    return result;

  };
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

