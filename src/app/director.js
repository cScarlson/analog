
;(function iif(Worker, undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    var channels = new (function Channels() {
        this['SOMETHING:CHANGED'] = 'ui://changed/something';
        
        return this;
    })();

    var director = new (function ApplicationDirector(Superclass, Utils, channels) {
        var thus = this;
        var utils = new Utils();
        var channels = channels || { };
        var publishers = {
            'ui://changed/something': handleSomethingChanged,
        };
        var subscribers = { };
        
        // METHODS
        
        function init(data) {
            var worker = new Worker('/app/worker.js');
            
            worker.subscribe('world', function handle(e, data, datum) {
                // console.log('@SUBSCRIBE', e, data, datum);
            }).publish('hello', { hello: false, world: false }, 'Sup planet...');
            
            // console.log('Application Initialized', worker);
            return this;
        }
        
        // HANDLERS
        
        function handleSomethingChanged(channel, data) {
            // console.log('@Director#handleSomethingChanged', channel, data);
        }
        
        // export precepts
        Superclass.apply(this);
        this.utils = utils;
        this.channels = channels;
        this.publishers = publishers;
        this.subscribers = subscribers;
        this.init = init;
        
        return this;
    })(Mediator, ENV.Utils, channels);
    
    ENV['director'] = director;
    
    return void 0;
}).call(window.app, WebWorkerApis);