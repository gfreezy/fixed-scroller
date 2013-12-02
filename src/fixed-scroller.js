/*
 * fixed-scroller
 * https://github.com/gfreezy/fixed-scroller
 *
 * Copyright (c) 2013 Alex.F
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.fixed_scroller = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.fixed_scroller = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.fixed_scroller.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.fixed_scroller.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].fixed_scroller = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
