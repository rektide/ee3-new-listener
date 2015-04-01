var assert= require('assert'),
  ee3= require('eventemitter3'),
  ee3NewListener= require('..')

var e= new ee3.EventEmitter3(),
  data= 0,
  listeners= 0
e.on('data', function(){
	++data
})
function listenSignal(){
	++listeners
}
e.on('newListener', listenSignal)
e.on('removeListener', listenSignal)

assert(data === 0)
assert(listeners === 0)

ee3NewListener(e)

e.on('data', function(){})
e.on('data', function(){})
e.on('data', function(){})
function noop(){
}
e.on('data', noop)
assert(listeners === 4)

e.removeListener('data', noop)
assert(listeners === 5)

e.removeAllListeners('data')
assert(listeners === 9)
