
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    var BaseAnalog = ENV.BaseAnalog;
    
    var EmailAnalog = function EmailAnalog($, logger) {
        var thus = this;
        var options = { };
        
        function init(options) {
            this.options = options;
            $.dom.on('focus', handleFocus.bind(this));
            return this;
        }
        
        // HANDLERS
        function handleFocus(e) {
            var data = { details: this.options };
            logger.log(data);
        }
        
        // export precepts
        this.options = options;
        this.init = init;
        
        return this;
    };
    EmailAnalog.prototype = new BaseAnalog();
    
    ENV['EmailAnalog'] = EmailAnalog;
    
    return void 0;
}).call(window.logging);
