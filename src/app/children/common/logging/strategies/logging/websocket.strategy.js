
;(function iif(Utilities, LightSocket, undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    /**
     * @Intention: Encapsulates a StorageStrategy and a publish method.
     * @Patterns: { Singleton, Adapter }
     * 
     */
    var WebSocketStrategy = new (function WebSocketStrategy(VERSION, Stat, socket, utils) {
        var INSTANCE = null;
        
        return function WebSocketLoggingStrategy(store) {
            var thus = this;
            var _DELAY = (1000 * 3);  // time before item-submission sequence (miliseconds)
            var _INTERVAL = (1000 * 0.1);  // time between item-submissions (miliseconds)
            
            var _transfer = function transfer() {
                if (!store.hasNext()) return;
                socket.publish('log://dispatched/item', store.next());
                setTimeout( transfer.bind(this), _INTERVAL );
            }.bind(this);
            
            function init(options) {
                
                socket.subscribe('log://dispatched/item', handleLogTransferResponse.bind(this));
                socket.subscribe('open', handleSocketOpen.bind(this));
                
                return this;
            }
            
            function publish(type, data) {
                var stat = new Stat(data);
                
                Stat.call(stat, { version: VERSION, timestamp: +(new Date()) });
                store.add(stat);
                
                console.log('@WebSocketStrategy#publish', type, store.values());
                handleTransferTrigger.call(this, { type: type, data: data });
                return this;
            }
            
            // HANDLERS
            
            function handleSocketOpen(e) {
                // console.log('SOCKET-OPEN', e);
                handleTransferTrigger.call(this, e);
            }
            
            function handleTransferTrigger(e) {
                setTimeout(_transfer, _DELAY);
            }
            
            function handleLogTransferResponse(e, item) {
                console.log('@log://dispatched/item LOG-TRANSFER RESPONSE', item);
            }
            
            // export precepts
            this.init = init;
            this.publish = publish;
            
            if (!INSTANCE) INSTANCE = this.init({});
            return INSTANCE;
        };
    })(ENV.VERSION, ENV.Stat, new LightSocket('wss://echo.websocket.org'), new Utilities());
    
    ENV['WebSocketLoggingStrategy'] = WebSocketStrategy;
    
    return void 0;
}).call(window.logging, window.app.Utils, LightSocket);
