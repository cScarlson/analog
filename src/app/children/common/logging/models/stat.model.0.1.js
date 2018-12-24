
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    var Stat = function Stat(options) {
        var options = options || { };
        
        this.version = options.version || this.version || 0;
        this.priority = options.priority || this.priority || 0;
        this.timestamp = options.timestamp || this.timestamp || +(new Date());
        this.type = options.type || this.type || "";
        this.authority = options.authority || this.authority || null;
        this.details = options.details || this.details || null;
        this.tags = options.tags || this.tags || [ ];
        // this.XXXX = options.XXXX || this.XXXX || XXXX;
        
        return this;
    };
    
    ENV['Stat'] = Stat;
    
    return void 0;
}).call(window.logging);
