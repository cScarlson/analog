
;(function iif(undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    // import worker.io
    // SharedWorker code goes here...
    ENV.importScripts('/app/utils/ds/Queue.js');
    ENV.importScripts('/lib/portal.io/portal.js');
    ENV.importScripts('/lib/portal.io/worker.io/scriptorium.js');
    
    var Worker = function Worker() {
        var thus = this;
        var queue = new Queue([ 'a', 'b', 'c', 'd', 'e', ]);
        
        function init(data) {
            queue.add('f');
            queue.add('g');
            queue.add('h');
            
            this.subscribe('hello', function handle(e, data) {
                var response = { request: data, response: { hello: true, world: true } };
                while (queue.hasNext()) this.publish('world', queue.next(), 'Hey Earf!');
            });
        }
        
        // export precepts
        this.init = init;
        
        return this.init({});
    };
    Worker.prototype = new WebWorkerScriptorium(this);
    
    var worker = new Worker();
    
    return void 0;
}).call(this);
