
var PortalEvent = function PortalEvent(options) {
    var options = options || { };
    
    this.type = options.type;
    this.data = options.data;
    
    return this;
};

var PortalPublishment = function PortalPublishment(options) {
    var options = options || { };
    
    this.channel = options.channel;
    this.parameters = options.parameters;
    
    return this;
};

var PortalMessage = function PortalMessage(options) {
    var options = options || new PortalPublishment({ channel: 'MISSING-CHANNEL', parameters: [ ] });
    
    this.name = options.name || 'parameters';
    this.publishment = options.publishment;
    
    return this;
};

/**
 * @Name: Portal
 * @Intention: Provide common interface and API to implementer classes such as WebSockets, WebWorkers, SharedWorkers, ServiceWorkers, etc
 * @Patterns: { Template Method, PublishSubscribe, EventAggregator }
 */
var Portal = function Portal(source) {
    var thus = this;
    
    function init() {
        return this;
    }
    
    function createSerializedMessage(publishment) {
        var publishment = publishment || new PortalPublishment({ channel: 'MISSING-CHANNEL', parameters: [ ] });
        var message = new PortalMessage({ publishment: publishment });
        return JSON.stringify(message);
    }
    
    function getDeserializedMessage(event) {
        if (!event) return this;
        var type = event.type, data = event.data;
        //
        var json = data || '{ }';
        var messageOptions = JSON.parse(json);
        var message = new PortalMessage(messageOptions);
        var publishment = new PortalPublishment(message.publishment);
        
        return publishment;
    }
    
    function publish(channel, data) {
        var args = Array.prototype.slice.call(arguments, 1);
        var publishment = new PortalPublishment({ channel: channel, parameters: args });
        var serialized = this.createSerializedMessage(publishment);
        
        this._send(serialized);
        return this;
    }
    
    function subscribe(channel, handler) {
        if (!this.channels[channel]) this.channels[channel] = [ ];
        var subscription = { context: this, handler: handler };
        this.channels[channel].push(subscription);
        
        return this;
    }
    
    function unsubscribe(channel, handler) {
        
    }
    
    function catchError(handler) {  // Needs Design work
        this.errorHandlers.push(handler);
        // eg: api.subscribe('mychannel').catch(handleThisChannelHadAnError); (this.subscribe returns a "subscription" instead of `this`)
        return this;
    }
    
    function send(message) {
        return this.send(message);
    }
    
    /**
     * @Name: Handle Message
     * @Intention: Handles publishment from WebSocket
     */
    function handleMessage(e) {
        var publishment = this.getDeserializedMessage(e);
        var channel = publishment.channel, args = publishment.parameters
        var event = new PortalEvent({ type: channel, data: e });
        if (!this.channels[channel]) this.channels[channel] = [ ];
        
        args.unshift(event);
        for (var i = 0, len = this.channels[channel].length; i < len; i++) {
            var subscription = this.channels[channel][i], context = subscription.context, handler = subscription.handler;
            handler.apply(context, args);
        }
        
        return this;
    }
    
    function handleError(e) {
        console.log('@Portal #error', e);
    }
    
    // export precepts
    this.channels = null;
    this.target = null;
    this._handleMessage = handleMessage;  // HOOK METHOD
    this._handleError = handleError;  // HOOK METHOD
    this.init = init;
    this._send = send;  // TEMPLATE METHOD
    this.createSerializedMessage = createSerializedMessage;
    this.getDeserializedMessage = getDeserializedMessage;
    this.publish = publish;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    this.catch = catchError;  // why not dispatch "error" event?
    
    return this;
};
