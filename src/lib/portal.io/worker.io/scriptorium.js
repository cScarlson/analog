
/**
 * @Name: WebWorkerScriptorium (Daemon)
 * @Intention: Provides an API to interact with a Worker alongside Custom Events.
 * @Patterns: { Facade, PublishSubscribe, EventAggregator }
 */
var WebWorkerScriptorium = function WebWorkerScriptorium(source) {
    var thus = this;
    var channels = { };
    var target = source || this;
    
    function init(data) {
        this.super.init(data);
        this.target.addEventListener('message', handleMessage.bind(this), false);
        // this.target.addEventListener('messageerror', handleMessageError.bind(this), false);
        return this;
    }
    
    function send(message) {
        this.target.postMessage(message);
        // this.target.dispatchEvent(new MessageEvent('message', { data: message }));
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
    this.super = WebWorkerScriptorium.prototype;
    this.channels = channels;
    this.target = target;
    this.init = init;
    this.send = send;  // HOOK METHOD
    
    return this.init({});
};
WebWorkerScriptorium.prototype = new Portal();