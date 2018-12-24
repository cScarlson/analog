
var Adapter = function Adapter(items) {
    var thus = this;
    
    function add(element) { return this.enqueue(element); }
    function next() { return this.dequeue(); }
    function contains(element) { return this.has(element); }
    function head() { return this.front(); }
    function hasNext() { return !this.isEmpty(); }
    
    // export precepts
    this.add = add;
    this.next = next;
    this.head = head;
    this.hasNext = hasNext;
    
    return this;
};

var Queue = function Queue(items) {
    var thus = this;
    var items = items || [ ];
    
    ;(function init(items) {
        items.forEach( enqueue.bind(this) );
        return this;
    }).call(this, items);
    
    function enqueue(element) {
        this.push(element);
        return this;
    }
    
    function dequeue() {
        var element = this.shift();
        return element;
    }
    
    function has(element) {
        var indexOf = this.indexOf(element), contains = !!~indexOf;
        return contains;
    }
    
    function front() {
        var element = this[0];
        return element;
    }
    
    function clear() {
        this.length = 0;
        return this;
    }
    
    function isEmpty() {
        var is = !this.length;
        return is;
    }
    
    function size() {
        var length = this.length;
        return length;
    }
    
    function values() {
        var items = this.slice(0);
        return items;
    }
    
    // export precepts
    Adapter.apply(this);
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.clear = clear;
    this.isEmpty = isEmpty;
    this.size = size;
    this.values = values;
    
    return this;
};
Queue.prototype = [ ];
