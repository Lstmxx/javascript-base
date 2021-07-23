// 不适用定时器的做法

function throttle(func, wait) {
  let context, args
  let previous = 0

  return function() {
    const now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

// 使用定时器的方式，但这版不能立刻停止

function throttle(func, wait) {
  let context, args
  let timeout = null

  return function() {
    const now = +new Date()
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

// 能立刻执行的同时也能立刻停止的

function throttle(func, wait) {
  let context, args, timeout
  let previous = 0
  const later = function() {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }
  const throttled = function() {
    const now = +new Date()
    const remaining = wait - (now - previous)
    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
  return throttled
}

// 通过option来控制是否有头或者是否有尾

function throttle(func, wait, options) {
  let timeout, context, args
  let pervious = 0

  if (!options) options = {}

  const later = function() {
    pervious = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function() {
    const now = new Date().getTime()

    if (!pervious && options.leading === false) pervious = now

    const remaining = wait - (now - pervious)

    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      pervious = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    pervious = 0
    timeout = null
  }

  return throttled

}