
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    var BaseAnalog = function BaseAnalog($, logger) {
        var thus = this;
        var options = { };
        
        function init(options) {
            return this;
        }
        
        // export precepts
        this.options = options;
        this.init = init;
        
        return this;
    };
    
    ENV['BaseAnalog'] = BaseAnalog;
    
    return void 0;
}).call(window.logging);
