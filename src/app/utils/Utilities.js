
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    /**
     * @Name:
     * @Intention:
     * @Patterns: { Singleton }
     */
    var Utils = new (function Utils(ds) {
        var INSTANCE = null;
        
        return function Utilities() {
            var thus = this;
            
            function noop() { }
            
            function debounce(fn, delay) {
                var timer = null;
                return function () {
                    var context = this, args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn.apply(context, args);
                    }, delay);
                };
            }
            
            function throttle(fn, threshhold, scope) {
                threshhold || (threshhold = 250);
                var last, deferTimer;
                return function () {
                    var context = scope || this;
                    var now = +new Date, args = arguments;
                    
                    if (last && now < last + threshhold) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            fn.apply(context, args);
                        }, threshhold);
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            }
            
            // export precepts
            this.ds = ds;
            this.noop = noop;
            this.uuid = noop;
            this.extend = noop;
            this.debounce = debounce;
            this.throttle = throttle;
            this.timeout = noop;
            
            if (!INSTANCE) INSTANCE = this;
            return INSTANCE;
        };
    })(ENV.ds);
    
    ENV['Utils'] = Utils;
    
    return void 0;
}).call(window.app);