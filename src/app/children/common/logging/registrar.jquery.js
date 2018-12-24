
;(function iif(jQuery, app, logging, undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    var __MissingAnalog__ = function MissingAnalog($, logger) {
        var thus = this;
        
        function init(options) {
            var error = new Error("ANALOG DIRECTIVE MISSING:");
            logger.warn({ details: error });
            return this;
        }
        
        // export precepts
        this.init = init;
        
        return this;
    };
    
    /**
     * @Intention:
     *      * Iterates through all elements targetted by [data-analog] attribute
     *      * Maps each element based upon its [data-analog] value to the correct AnalogDirective
     *      * Constructs an AnalogDirective instance and supplies the target element and a LogService instance
     *      * Initializes an AnalogDirective instance and supplies configuration data if possible
     */
    var registrar = new (function Registrar(app, logging, jQuery) {
        var thus = this;
        var director = app.director
          , Sandbox = app.Sandbox
          ;
        var SessionQueueStorageStrategy = logging.SessionQueueStorageStrategy
          , WebSocketLoggingStrategy = logging.WebSocketLoggingStrategy
          , Logger = logging.Logger
          ;
        var _analogMap = {
            'undefined': logging.BaseAnalog,
            '': logging.BaseAnalog,
            'app': logging.DocumentAnalog,
            'text': __MissingAnalog__,
            'selectbox': __MissingAnalog__,
            'multiselect': __MissingAnalog__,
            '#my-email-analytics': logging.EmailAnalog,
            'custom-component': logging.CustomAnalog,
        };
        
        function init(options) {
            // console.log('@analysis.directive', options);
            this.each(bootstrap.bind(this, options));
            return this;
        }
        
        function bootstrap(defaults, i, element) {
            var type = element.dataset.analog                   // e.g: "app" if [data-analog="app"]
              , options = element.dataset.logoptions || '{ }'   // e.g: '{ "debounce": 1000, "unit": "miliseconds" }'
              , options = JSON.parse(options)                   // e.g: { debounce: 1000, unit: 'miliseconds' }
              ;
            var sandbox = new Sandbox(director, jQuery(element));
            var config = jQuery.extend({}, defaults, options);                      // copy & overwrite defaults with locals
            var storageStrategy = new SessionQueueStorageStrategy()                 // singleton
              , loggingStrategy = new WebSocketLoggingStrategy(storageStrategy)     // singleton
              , logger = new Logger(loggingStrategy)                                // LogService
              ;
            var Analog = _analogMap[type] || __MissingAnalog__, analog = new Analog(sandbox, logger);
            
            analog.init(config);
        }
        
        // export precepts
        this.init = init;
        
        return this;
    })(app, logging, jQuery);
    
    ENV['analyze'] = registrar.init;
    
    return void 0;
}).call(jQuery.fn, jQuery, window.app, window.logging);
