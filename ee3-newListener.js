var mixMaster = require('mix-master')

module.exports= function(eventEmitter){
	function emittingOn(name, listener){
		arguments.callee._get().call(this, name, listener)
		this.emit('newListener', name, listener)
	}
	mixMaster(eventEmitter, 'on', emittingOn)
	mixMaster(eventEmitter, 'addListener', emittingOn)

	function emittingOnce(name, listener){
		arguments.callee._get().call(this, name, listener)
		this.emit('newListener', name, listener)
	}
	mixMaster(eventEmitter, 'once', emittingOnce)

	function emittingRemoveListener(name, listener){
		var previous = this._events[name]
		arguments.callee._get().call(this, name, listener)
		if(this._events[name] !== previous){
			this.emit('removeListener', name, listener)
		}
	}
	mixMaster(eventEmitter, 'removeListener', emittingRemoveListener)

	function emittingRemoveAllListeners(name){
		var removeListeners = this.listeners('removeListener')
		if(removeListeners){
			if(name === undefined){
				for(var i in this._events){
					var these= this._events[these]
					for(var j in these){
						this.emit('removeListener', i, these[j].fn)
					}
				}
			}else{
				var these= this.listeners(name)
				for(var j in these){
					this.emit('removeListener', name, these[j].fn)
				}
			}
		}
		arguments.callee._get().call(this, name, listener)
	}
	mixMaster(eventEmitter, 'removeAllListeners', emittingRemoveAllListeners)
}
