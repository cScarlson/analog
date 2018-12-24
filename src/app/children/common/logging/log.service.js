
/*
    Minimal Environments:
    Web-Admin: Legacy (jQuery, Telerik, etc) + Angular (4, 5)
    Web-App: Legacy (jQuery, Telerik, etc)
*/

;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    // Use an Adapter to encapsulate a communication strategy whose post() or log() method can implement different protocols (HTTP, WebSocket, etc)
    var LogService = function LogService(strategy) {
        var thus = this;
        
        function init(options) {
            return this;
        }
        
        function log(data) {
            var PRIORITY = 0;
            var type = '';
            data.priority = PRIORITY;
            strategy.publish(type, data);
            return this;
        }
        
        function info(data) {
            var PRIORITY = 0;
            var type = '';
            data.priority = PRIORITY;
            strategy.publish(type, data);
            return this;
        }
        
        function warn(data) {
            var PRIORITY = 1;
            var type = '';
            data.priority = PRIORITY;
            strategy.publish(type, data);
            return this;
        }
        
        function error(data) {
            var PRIORITY = 2;
            var type = '';
            data.priority = PRIORITY;
            strategy.publish(type, data);
            return this;
        }
        
        function fatal(data) {
            var PRIORITY = 1000;
            var type = '';
            data.priority = PRIORITY;
            strategy.publish(type, data);
            return this;
        }
        
        // export precepts
        this.init = init;
        this.log = log;
        this.info = info;
        this.warn = warn;
        this.error = error;
        this.fatal = fatal;
        
        return this;
    };
    ENV['Logger'] = LogService;
    
    return void 0;
}).call(window.logging);
