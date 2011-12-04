;(function(window, document, undefined) {
  var $A = function(iterable) { // turns any iterable into an array
    return Array.prototype.slice.call(iterable, 0)
  }
  var DomWrapper = function() { return this.initialize.apply(this, arguments) }
  DomWrapper.prototype = {
    initialize: function(selector, context) {
      var validElTypes = [1, 9, 11];
      var matches = [];
      this.length = 0;
      if(!selector) return this;
      if(!context) context = document

      try {
        matches = context.querySelectorAll(selector);
      }
      catch (e) {
        if(validElTypes.indexOf(selector.nodeType) == -1) {
          //HTML string
          var div = document.createElement('div');
          div.innerHTML = selector;
          for (var i = 0, l = div.children.length; i < l; i++)
            matches[i] = div.children[i];
        }
      }

      // (iterable)
      if (matches.length > 0) {
        for (var e = 0, l = matches.length; e < l; e++)
          this[e] = matches[e]
        this.length = matches.length

      } else {
        // DOM node
        this.length = 1
        this[0] = selector
      }

      return this
    },
    splice: function() { // makes WebKit Inspector log DomWrapper objects like arrays (yay!)
      return Array.prototype.splice.apply(this, arguments)
    },

    each: function(callback) {
      if (this.length > 1) // avoid loop if only one item
        for (var i = 0, l = this.length; i < l; i++)
          callback.call(this[i], i, this[i])
      else if (this.length === 1)
        callback.call(this[0], 0, this[0])
      return this
    },

    // HTML
    html: function(html) {
    return (html === undefined) ?
      (this.length > 0 ? this[0].innerHTML : null) :
      this.each(function() { this.innerHTML = html });
    },
    text: function(text) {
      return (text === undefined) ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function() { this.textContent = text });
    },

    // element manipulation
    append: function(html) {
      return (html === undefined) ? null :
      this.each(function() { this.appendChild(html) });
    },
    prepend: function() {
    },
    before: function() {
    },
    after: function() {
    },

    remove: function() {
    },

    // className
    addClass: function(classNames) {
    },
    removeClass: function(classNames) {
    },
    hasClass: function(className) {
    },
    toggleClass: function(classNames) {
    },

    // element filtering
    is: function(selector) {
    },

    filter: function(selector) {
    },
    not: function(selector/* or element */) {
    },

    // DOM traversal
    children: function(selector) {
    },
    find: function(selector) {
    },

    prev: function(selector) {
    },
    next: function(selector) {
    },
    siblings: function(selector) {
    },

    parent: function(selector) {
    },
    closest: function(selector) {
    },

    // CSS styles
    css: function(property, value) {
    },

    // events
    on: function(eventName, handler) {
    }
  }
  window.DomWrapper = DomWrapper
  window.$ = function(arg1, arg2) { return new DomWrapper(arg1, arg2) }
})(window, document)
