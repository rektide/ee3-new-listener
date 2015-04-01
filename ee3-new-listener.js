var mixMaster = require('mix-master')

module.exports= function(eventEmitter){
	function emittingOn(){
		var val= arguments.callee._get()
		return function(name, listener){
			var ret= val.call(this, name, listener)
			this.emit('newListener', name, listener)
			return ret
		}
	}
	mixMaster(eventEmitter, 'on', emittingOn)
	mixMaster(eventEmitter, 'addListener', emittingOn)

	function emittingOnce(){
		var val= arguments.callee._get()
		return function(name, listener){
			var ret= val.call(this, name, listener)
			this.emit('newListener', name, listener)
			return ret
		}
	}
	mixMaster(eventEmitter, 'once', emittingOnce)

	function emittingRemoveListener(){
		var val= arguments.callee._get()
		return function(name, listener){
			var previous = this.listeners(name).length,
			  ret= val.call(this, name, listener)
			if(this.listeners(name).length !== previous){
				this.emit('removeListener', name, listener)
			}
			return ret
		}
	}
	mixMaster(eventEmitter, 'removeListener', emittingRemoveListener)

	function emittingRemoveAllListeners(){
		var val= arguments.callee._get()
		return function(name){
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
			return val.call(this, name)
		}
	}
	mixMaster(eventEmitter, 'removeAllListeners', emittingRemoveAllListeners)
}
