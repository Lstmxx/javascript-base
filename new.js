function objectFactory() {

  var obj = new Object()

  Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype

  var res = Constructor.apply(obj, arguments)

  return typeof res === 'object' ? res : obj

};
