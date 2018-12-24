
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    var http = new (function MOCKHTTPService(options) {
        var thus = this;
        var options = options || { };
        
        function log(url, data) {
            console.log('@HTTP #log| &url: %s', url, data);
            return this;
        }
        
        // export precepts
        this.get = log;
        this.post = log;
        this.put = log;
        this.delete = log;
        
        return this;
    })({});
    
    ENV['http'] = http;
    
    return void 0;
}).call(window.app);
