
var EventHub = function EventHub() {
    var thus = this;
    var channels = { };
    
    var Event = function Event(options) {
        var thus = this;
        var options = options || { };
        
        // export precepts
        this.type = options.type;
        
        return this;
    };
    
    var _dispatch = function dispatchEvent(options) {
        var options = options || { }, subscription = options.subscription, parameters = [].concat(options.parameters);
        var context = subscription.context, handler = subscription.handler, event = subscription.event;
        
        parameters.unshift(event);
        handler.apply(this, parameters);
        
        return dispatchEvent.bind(this);
    }.bind(this);
    
    function publish(channel, data) {
        if (!this.channels[channel]) this.channels[channel] = [ ];
        var args = Array.prototype.slice.call(arguments, 1);
        
        for (var i = 0, len = this.channels[channel].length; i < len; i++) {
            var subscription = this.channels[channel][i];
            _dispatch({ subscription: subscription, parameters: args });
        }
        
        return this;
    }
    
    function subscribe(channel, handler) {
        if (!this.channels[channel]) this.channels[channel] = [ ];
        var event = new Event({ type: channel }), subscription = { context: this, handler: handler, event: event };
        this.channels[channel].push(subscription);
        
        return this;
    }
    
    function unsubscribe(channel, handler) {
        if (!this.channels[channel] || !this.channels[channel].length) return this;
        
        for (var i = this.channels[channel].length; i--;) {
            var subscription = this.channels[channel][i], listener = subscription.handler;
            if (listener === handler) this.channels[channel].splice(i, 1);
        }
        
        return this;
    }
    
    // export precepts
    this.channels = channels;
    this.publish = publish;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    
    return this;
};
