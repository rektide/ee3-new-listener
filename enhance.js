var ee3NewListener= require('./ee3-new-listener'),
  ee= require('eventemitter3')

ee3NewListener(ee.prototype)

module.exports= ee
