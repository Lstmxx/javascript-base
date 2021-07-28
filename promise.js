// 第一版

function MyPromise(fn) {

  const self = this

  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallBack = []
  
  function resolve(value) {
    console.log(value)
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      for(let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(err) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = err
      for(let i = 0; i < self.onRejectedCallBack.length; i++) {
        self.onRejectedCallBack[i](err)
      }
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

MyPromise.prototype.then = function(onResolved, onRejected) {
  const self = this
  let promise2
  console.log(self)
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) { return v }
  onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e }

  if (self.status === 'resolved') {
    return promise2 = new MyPromise(function(resolve, reject) {
      try {
        const res = onResolved(self.data)
        console.log('resolve', res)
        if (res instanceof MyPromise) {
          res.then(resolve, reject)
        }
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new MyPromise(function(resolve, reject) {
      try {
        const res = onRejected(self.data)
        if (res instanceof MyPromise) {
          res.then(resolve, reject)
        }
      } catch (error) {
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new MyPromise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          const res = onResolved(value)
          if (res instanceof MyPromise) {
            res.then(resolve, reject)
          }
        } catch (error) {
          reject(error)
        }
      })
      self.onRejectedCallBack.push(function(err) {
        try {
          const res = onResolved(err)
          if (res instanceof MyPromise) {
            res.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

const p = new MyPromise((resolve, reject) => {
  resolve(123)
})

p.then((val) => {
  console.log(val)
  return val
}).then((result) => {
  console.log(result)
})

Promise.then()


function resolvePromise(promise2, x, resolve, reject) {
  let then;
  let thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycly detected for promise!'))
  }

  if (x instanceof MyPromise) {
    if (x.status === 'pending') {
      x.then(function(value) {
        resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  }
}