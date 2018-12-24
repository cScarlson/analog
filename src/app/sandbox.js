
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;

    var Sandbox = function ApplicationSandbox(director, dom) {
        var thus = this;
        
        function publish() {
            director.publish.apply(director, arguments);
            return this;
        }
        function subscribe() {
            director.subscribe.apply(director, arguments);
            return this;
        }
        function unsubscribe() {
            director.unsubscribe.apply(director, arguments);
            return this;
        }
        
        // export precepts
        this.dom = dom;  // lazy, Sandboxes should only be scoped to their current element & its children
        this.utils = director.utils;  // lazy, not secure
        this.channels = director.channels;  // lazy, not secure
        this.publish = publish;
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;
        
        return this;
    };
    
    ENV['Sandbox'] = Sandbox;
    
    return void 0;
}).call(window.app);
