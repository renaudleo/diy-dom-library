;(function(window, document, undefined) {
  var $A = function(iterable) { // turns any iterable into an array
    return Array.prototype.slice.call(iterable, 0)
  }
  var DomWrapper = function() { return this.initialize.apply(this, arguments) }
  DomWrapper.prototype = {
    initialize: function(arg1, arg2) {
      var context, matches;
      this.length = 0;
      if(!arg1) return this;

      context = (arg2) ? arg2 : document;
      try {
        matches = context.querySelectorAll(arg1);
      }
      catch (e) {
        matches = [];
      }

      // (iterable)
      if ('length' in matches) {
        for (var e = 0, l = matches.length; e < l; e++)
          this[e] = matches[e]
        this.length = matches.length

      } else {
        // single element
        this.length = 1
        this[0] = matches[0]
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
      this.each(function(i, el) {
        el.innerHTML = html;
      })
    },
    text: function(text) {
      this.each(function(i, el) {
        el.textContent = text;
      })
    },

    // element manipulation
    append: function() {
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
