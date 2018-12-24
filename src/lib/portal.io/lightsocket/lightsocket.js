
/**
 * @Name: LightSocket (Client)
 * @Intention: Provides an API to interact with a WebSocket backend alongside Custom Events.
 * @Patterns: { Facade, PublishSubscribe, EventAggregator }
 */
var LightSocket = function LightSocket(source) {
    var thus = this;
    var channels = { };
    var target = new WebSocket(source);
    
    function init(data) {
        this.super.init(data);
        this.target.addEventListener('open', handleConnectionOpened.bind(this), false);
        this.target.addEventListener('message', handleMessage.bind(this), false);
        // this.target.addEventListener('error', handleError.bind(this), false);
        this.target.addEventListener('close', handleConnectionClosed.bind(this), false);
        
        return this;
    }
    
    function send(message) {
        // this.target.send(message);
        this.target.dispatchEvent(new MessageEvent('message', { data: message }));
        return this;
    }
    
    /**
     * ================================================================================================================================
     *           |
     *           |
     * HANDLERS \|/
     *           V
     * ================================================================================================================================
     **/
    
    /**
     * @Name: Handle Connection
     * @Intention: Dispatch Connection Event to subscribers.
     */
    function handleConnectionOpened(e) {
        var publishment = new PortalPublishment({ channel: e.type, parameters: [ ] });
        var serialized = this.createSerializedMessage(publishment);
        
        handleMessage.call(this, { type: e.type, data: serialized });
        return this;
    }
    
    function handleConnectionClosed(e) {
        console.log('@LightSocket #connection-closed', e);
    }
    
    /**
     * @Name: Handle Message
     * @Intention: Handles publishment from WebSocket; forwards request to Superclass.
     */
    function handleMessage(e) {
        this._handleMessage(e);
        return this;
    }
    
    function handleMessageError(e) {
        // this._handleError(e);
        return this;
    }
    
    // export precepts
    this.super = LightSocket.prototype;
    this.channels = channels;
    this.target = target;
    this.init = init;
    this.send = send;  // HOOK METHOD
    
    return this.init({});
};
LightSocket.prototype = new Portal();
