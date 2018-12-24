
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    var BaseAnalog = ENV.BaseAnalog;
    
    var GlobalExceptionAnalog = function GlobalExceptionAnalog($, logger) {
        var thus = this;
        var options = { };
        
        function init(options) {
            this.options = options;
            window.addEventListener('error', handleGlobalError.bind(this), false);
            return this;
        }
        
        function handleGlobalError(e) {
            var error = e.error, message = e.message, lineno = e.lineno, colno = e.colno, filename = e.filename;
            var details = {
                message: message,
                filename: filename,
                line: lineno,
                column: colno,
            };
            var tags = [ 'global', 'error', 'exception' ];
            logger.log({ type: 'exception', details: details, tags: tags });
        }
        
        // export precepts
        this.options = options;
        this.init = init;
        
        return this;
    };
    
    var DocumentAnalog = function DocumentAnalog($, logger) {
        var thus = this;
        var options = { };
        
        function init(options) {
            this._init(options);  // invoke Superclass.init
            var location = window.location
              , navigator = window.navigator
              , performance = window.performance
              , cookie = document.cookie
              , activeElement = document.activeElement
              ;
            var url = location.href
              , userAgent = navigator.userAgent
              ;
            var details = {
                url: url,
                userAgent: userAgent,
            };
            
            this.options = options;
            logger.log({ type: 'app-start', details: details });
            
            return this;
        }
        
        // export precepts
        GlobalExceptionAnalog.call(this, $, logger);  // inherit
        this._init = this.init;  // super
        this.options = options;
        this.init = init;
        
        return this;
    };
    DocumentAnalog.prototype = new BaseAnalog();
    
    ENV['DocumentAnalog'] = DocumentAnalog;
    
    return void 0;
}).call(window.logging);
