
;(function iif(ds, sessionStorage, undefined) {
    'use strict';
    if (undefined) return void 0;
    var ENV = this;
    
    /**
     * @Intention: Encapsulates a structure and exposes a consistent public interface.
     * @Patterns: { Singleton, Adapter }
     * 
     */
    var SessionQueueStrategy = new (function SessionQueueStrategy(VERSION, Queue, session) {
        var INSTANCE = null;
        
        return function SessionQueueStorageStrategy() {
            var thus = this;
            var _SESSION_ID = ('LOGGER-' + VERSION);
            var store = new Queue();
            
            var _serialize = function serialize(data) {
                var json = JSON.stringify(data);
                return json;
            };
            
            var _deserialize = function deserialize(json) {
                var data = JSON.parse(json);
                return data;
            };
            
            var _updateSession = function updateSession(values) {
                var values = values || store.values(), json = _serialize(values);
                session.setItem(_SESSION_ID, json);
            }.bind(this);
            
            var _getSessionData = function getSessionData() {
                var json = session.getItem(_SESSION_ID), data = _deserialize(json);
                return data;
            }.bind(this);
            
            function add(stat) {
                store.add(stat);
                _updateSession(store.values());
                return this;
            }
            function next() {
                var next = store.next();
                _updateSession(store.values());
                return next;
            }
            function hasNext() {
                return store.hasNext();
            }
            function values() {
                return store.values();
            }
            function size() {
                return store.size();
            }
            function clear() {
                store.clear();
                _updateSession(store.values());
                return this;
            }
            
            // export precepts
            this.add = add;
            this.next = next;
            this.hasNext = hasNext;
            this.values = values;
            this.size = size;
            this.clear = clear;
            
            if (!INSTANCE) INSTANCE = this;
            return this;
        };
    })(ENV.VERSION, ds.Queue, sessionStorage);
    
    ENV['SessionQueueStorageStrategy'] = SessionQueueStrategy;
    
    return void 0;
}).call(window.logging, window.app.ds, window.sessionStorage);
