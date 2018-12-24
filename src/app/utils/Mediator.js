
var Mediator = function Mediator() {
    var thus = this;
    var channels = { };
    var publishers = { };
    var subscribers = { };
    
    function publish(channel, data) {
        if (!channel) return this;
        
        if (!this.publishers[channel]) Mediator.prototype.publish.apply(this, arguments);  // pass through
        else this.publishers[channel].apply(this, arguments);  // catch
        
        return this;
    }
    
    function subscribe(channel, handler) {
        if (!channel || !handler) return this;
        
        if (!this.publishers[channel]) Mediator.prototype.subscribe.apply(this, arguments);  // pass through
        else this.publishers[channel].apply(this, arguments);  // catch
        
        return this;
    }
    
    function unsubscribe(channel, handler) {
        Mediator.prototype.unsubscribe.apply(this, arguments);  // pass through
        return this;
    }
    
    // export precepts
    this.channels = channels;
    this.publishers = publishers;
    this.subscribers = subscribers;
    this.publish = publish;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    
    return this;
};
Mediator.prototype = new EventHub();
