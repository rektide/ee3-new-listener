module.exports= function(eventEmitter){
	function once(eventName, listener){
		this._once(eventName, listener)
		this.emit('newListener', eventName, listener)
	}
	var _once = eventEmitter.once
	Object.defineProperty(eventEmitter, '_once', {
		value: _once
		writable: true
	})
	Object.defineProperty(eventEmitter, 'once', {
		value: once,
		writable: true
	})
}
