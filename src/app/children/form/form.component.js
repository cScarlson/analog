
;jQuery(function iif(Sandbox, FormComponent) { (new FormComponent(new Sandbox(this.director, jQuery('form')))).init(); }.bind(window.app, window.app.Sandbox, function FormComponent($) {
    var thus = this;
    
    function init(data) {
        $.dom.on('submit', handleSubmit.bind(this));
        return this;
    }
    
    function handleSubmit(e) {
        console.log('@FormComponent#handleSubmit', e);
        e.preventDefault();
        return false;
    }
    
    // export precepts
    this.init = init;
    this.handleSubmit = handleSubmit;
    
    return this;
}));
