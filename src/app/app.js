
;(function iif(jQuery, undefined) {
    'use strict';
    if (undefined) void 0;
    var ENV = this;
    
    var application = new (function Application($) {
        var thus = this;
        var modules = { };
        
        function register(id, component) { }  // lazy, has no MLM (Module Lifecycle Management)
        function bootstrap(options) { }
        
        function init() {
            this.director.init();
            $('[data-analog]').analyze({ defaults: true });
            return this;
        }
        
        // export precepts
        // this.register = register;
        // this.bootstrap = bootstrap;
        this.init = init;
        
        return this;
    })(jQuery);
    
    ENV['app'] = ENV['application'] = application;
    
    jQuery(app.init.bind(app));
    
    return void 0;
}).call(window, jQuery);
